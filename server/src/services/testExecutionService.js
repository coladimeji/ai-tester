const Docker = require('dockerode');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs').promises;

class TestExecutionService {
    constructor() {
        this.docker = new Docker();
        this.environments = {
            javascript: {
                image: 'node:16',
                setup: ['npm install playwright'],
                fileExtension: '.js'
            },
            python: {
                image: 'python:3.9',
                setup: ['pip install pytest selenium'],
                fileExtension: '.py'
            }
        };
    }

    async executeTest(script, language, mode) {
        try {
            const startTime = Date.now();
            const containerId = await this.createContainer(language);
            
            // Write test script to temp file
            const testFilePath = await this.writeTestFile(script, language);
            
            // Execute test in container
            const results = await this.runTestInContainer(containerId, testFilePath, language);
            
            // Clean up
            await this.cleanup(containerId, testFilePath);
            
            const executionTime = Date.now() - startTime;
            
            return {
                status: results.success ? 'passed' : 'failed',
                results: {
                    passed: results.passed,
                    failed: results.failed,
                    total: results.total
                },
                logs: results.logs,
                executionTime
            };
        } catch (error) {
            logger.error('Test execution error:', error);
            throw new Error('Test execution failed');
        }
    }

    async createContainer(language) {
        const env = this.environments[language];
        const container = await this.docker.createContainer({
            Image: env.image,
            Cmd: ['/bin/bash'],
            Tty: true,
            WorkingDir: '/tests'
        });
        
        await container.start();
        return container.id;
    }

    async writeTestFile(script, language) {
        const env = this.environments[language];
        const fileName = `test_${Date.now()}${env.fileExtension}`;
        const filePath = path.join('/tmp', fileName);
        
        await fs.writeFile(filePath, script);
        return filePath;
    }

    async runTestInContainer(containerId, testFilePath, language) {
        const container = this.docker.getContainer(containerId);
        const env = this.environments[language];
        
        // Copy test file to container
        await container.exec({
            Cmd: ['cp', testFilePath, '/tests/']
        });
        
        // Run setup commands
        for (const cmd of env.setup) {
            await container.exec({
                Cmd: ['sh', '-c', cmd]
            });
        }
        
        // Execute test
        const execution = await container.exec({
            Cmd: this.getTestCommand(language, testFilePath),
            AttachStdout: true,
            AttachStderr: true
        });
        
        const output = await execution.start();
        return this.parseTestResults(output);
    }

    getTestCommand(language, testFilePath) {
        switch (language) {
            case 'javascript':
                return ['node', testFilePath];
            case 'python':
                return ['pytest', testFilePath];
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }

    async cleanup(containerId, testFilePath) {
        const container = this.docker.getContainer(containerId);
        await container.stop();
        await container.remove();
        await fs.unlink(testFilePath);
    }

    parseTestResults(output) {
        // Parse test execution output and return structured results
        // This is a simplified version - you'll need to adapt it based on your testing framework
        const logs = output.toString().split('\n');
        
        return {
            success: !logs.some(log => log.includes('FAILED')),
            passed: logs.filter(log => log.includes('PASSED')).length,
            failed: logs.filter(log => log.includes('FAILED')).length,
            total: logs.filter(log => log.includes('PASSED') || log.includes('FAILED')).length,
            logs: logs.map(log => ({
                level: this.getLogLevel(log),
                message: log,
                timestamp: new Date()
            }))
        };
    }

    getLogLevel(log) {
        if (log.includes('ERROR')) return 'error';
        if (log.includes('WARN')) return 'warn';
        return 'info';
    }
}

module.exports = new TestExecutionService();