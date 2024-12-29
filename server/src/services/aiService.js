const { Configuration, OpenAIApi } = require('openai');
const logger = require('../utils/logger');

class AIService {
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async generateTestScript(applicationUrl, hints, language = 'javascript') {
        try {
            const prompt = this.buildPrompt(applicationUrl, hints, language);
            const completion = await this.openai.createCompletion({
                model: "gpt-4",
                prompt: prompt,
                max_tokens: 1500,
                temperature: 0.7,
            });

            const generatedScript = completion.data.choices[0].text.trim();
            return this.formatTestScript(generatedScript, language);
        } catch (error) {
            logger.error('Error generating test script:', error);
            throw new Error('Failed to generate test script');
        }
    }

    buildPrompt(applicationUrl, hints, language) {
        return `Generate a test script in ${language} for the following application:
            URL: ${applicationUrl}
            Requirements: ${hints}
            Include test cases for:
            - Basic functionality
            - Error handling
            - Edge cases
            Please provide a complete, runnable test script.`;
    }

    formatTestScript(script, language) {
        // Add language-specific formatting
        switch (language.toLowerCase()) {
            case 'javascript':
                return this.formatJavaScriptTest(script);
            case 'python':
                return this.formatPythonTest(script);
            default:
                return script;
        }
    }

    formatJavaScriptTest(script) {
        return `
// Generated Test Script
const { test, expect } = require('@playwright/test');

${script}
        `.trim();
    }

    formatPythonTest(script) {
        return `
# Generated Test Script
import pytest
from selenium import webdriver

${script}
        `.trim();
    }
}

module.exports = new AIService();