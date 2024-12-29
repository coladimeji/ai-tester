import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const TestEditor = ({ value, onChange, language }) => {
    const [editorTheme, setEditorTheme] = useState('vs-dark');

    const handleEditorChange = (value) => {
        onChange(value);
    };

    const getLanguageId = () => {
        switch (language.toLowerCase()) {
            case 'javascript':
                return 'javascript';
            case 'python':
                return 'python';
            case 'java':
                return 'java';
            default:
                return 'plaintext';
        }
    };

    return (
        <div className="h-full">
            <div className="mb-2 flex justify-end">
                <select
                    value={editorTheme}
                    onChange={(e) => setEditorTheme(e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    <option value="vs-dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>
            <div className="h-[500px] border rounded">
                <MonacoEditor
                    height="100%"
                    language={getLanguageId()}
                    theme={editorTheme}
                    value={value}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                        formatOnPaste: true,
                        formatOnType: true,
                    }}
                />
            </div>
        </div>
    );
};

export default TestEditor;