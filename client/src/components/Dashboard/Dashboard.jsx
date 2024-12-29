import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TestRunner from '../TestRunner/TestRunner';
import ResultsViewer from '../ResultsViewer/ResultsViewer';

const Dashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('runner');

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">AI Tester</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <button
                                    onClick={() => setActiveTab('runner')}
                                    className={`${
                                        activeTab === 'runner'
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Test Runner
                                </button>
                                <button
                                    onClick={() => setActiveTab('results')}
                                    className={`${
                                        activeTab === 'results'
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Results
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">{user?.email}</span>
                            <button
                                onClick={() => logout()}
                                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {activeTab === 'runner' ? <TestRunner /> : <ResultsViewer />}
            </main>
        </div>
    );
};

export default Dashboard;