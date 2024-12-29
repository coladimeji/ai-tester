import React, { useState } from 'react';
import { testService } from '../../services/api';
import TestEditor from '../TestEditor/TestEditor';

const TestGenerator = () => {
    const [url, setUrl] = useState('');
    const [hints, setHints] = useState('');
    const [generatedScript, setGeneratedScript] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('javascript');

    const handleGenerate = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await testService.generateTestScript(url, hints, language);
            setGeneratedScript(result.script);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Application URL
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                        placeholder="https://example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Language
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Test Requirements/Hints
                </label>
                <textarea
                    value={hints}
                    onChange={(e) => setHints(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                    placeholder="Describe what you want to test..."
                />
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Generating...' : 'Generate Test Script'}
            </button>

            {generatedScript && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Generated Script</h3>
                    <TestEditor
                        value={generatedScript}
                        onChange={setGeneratedScript}
                        language={language}
                    />
                </div>
            )}
        </div>
    );
};

export default TestGenerator;