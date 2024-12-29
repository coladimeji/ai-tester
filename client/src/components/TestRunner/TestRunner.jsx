import React, { useState } from 'react';
import { testService } from '../../services/api';

const TestRunner = () => {
    const [script, setScript] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [mode, setMode] = useState('normal');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExecuteTest = async () => {
        try {
            setLoading(true);
            const result = await testService.executeTest(script, language, mode);
            setResults(result);
        } catch (error) {
            console.error('Test execution failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
            </div>

            <div className="mb-4">
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="normal">Normal Mode</option>
                    <option value="safe">Safe Mode</option>
                </select>
            </div>

            <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="w-full h-64 p-2 border rounded mb-4"
                placeholder="Enter your test script here..."
            />

            <button
                onClick={handleExecuteTest}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loading ? 'Executing...' : 'Run Test'}
            </button>

            {results && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Results:</h3>
                    <pre className="bg-gray-100 p-4 rounded">
                        {JSON.stringify(results, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default TestRunner;