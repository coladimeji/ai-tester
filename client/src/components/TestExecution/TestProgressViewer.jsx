import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import websocketService from '../../services/websocketService';

const TestProgressViewer = ({ testId }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('preparing');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        websocketService.joinTestRoom(testId);

        const handleTestUpdate = (data) => {
            setProgress(data.progress);
            setStatus(data.status);
            setLogs(prev => [...prev, data.log]);
        };

        websocketService.addListener('test-update', handleTestUpdate);

        return () => {
            websocketService.leaveTestRoom(testId);
            websocketService.removeListener('test-update', handleTestUpdate);
        };
    }, [testId]);

    const getStatusColor = () => {
        switch (status) {
            case 'running':
                return '#3498db';
            case 'passed':
                return '#2ecc71';
            case 'failed':
                return '#e74c3c';
            default:
                return '#95a5a6';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                    <div className="w-48 h-48">
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}%`}
                            styles={buildStyles({
                                pathColor: getStatusColor(),
                                textColor: getStatusColor(),
                                trailColor: '#ecf0f1'
                            })}
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-lg font-semibold capitalize">
                            Status: {status}
                        </span>
                    </div>
                </div>
                
                <div className="overflow-y-auto h-64 bg-gray-50 rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Execution Logs</h3>
                    {logs.map((log, index) => (
                        <div
                            key={index}
                            className={`p-2 mb-1 rounded ${
                                log.level === 'error'
                                    ? 'bg-red-100 text-red-800'
                                    : log.level === 'warning'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            <span className="text-sm font-mono">
                                {new Date(log.timestamp).toLocaleTimeString()} -{' '}
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestProgressViewer;