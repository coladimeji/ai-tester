const TestResult = require('../models/TestResult');
const { executeTest } = require('../services/testExecutionService');
const { generateTestScript } = require('../services/aiService');

class TestController {
    async executeTest(req, res) {
        try {
            const { script, language, mode } = req.body;
            const userId = req.user.id;

            const result = await executeTest(script, language, mode);
            
            const testResult = new TestResult({
                userId,
                testScript: script,
                language,
                status: result.status,
                results: result.results,
                logs: result.logs,
                executionTime: result.executionTime,
            });

            await testResult.save();

            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error executing test', 
                error: error.message 
            });
        }
    }

    async generateScript(req, res) {
        try {
            const { applicationUrl, hints } = req.body;
            const userId = req.user.id;

            const generatedScript = await generateTestScript(applicationUrl, hints);

            res.json({ script: generatedScript });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error generating test script', 
                error: error.message 
            });
        }
    }

    async getResults(req, res) {
        try {
            const userId = req.user.id;
            const results = await TestResult.find({ userId })
                .sort({ createdAt: -1 })
                .limit(50);

            res.json(results);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching test results', 
                error: error.message 
            });
        }
    }
}

module.exports = new TestController();