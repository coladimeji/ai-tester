import React, { useState } from 'react';
import { format } from 'date-fns';

const TestResultsTable = ({ results }) => {
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedResults = [...results].sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
            case 'createdAt':
                comparison = new Date(a.createdAt) - new Date(b.createdAt);
                break;
            case 'status':
                comparison = a.status.localeCompare(b.status);
                break;
            case 'passed':
                comparison = a.results.passed - b.results.passed;
                break;
            case 'failed':
                comparison = a.results.failed - b.results.failed;
                break;
            default:
                comparison = 0;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('createdAt')}
                        >
                            Date
                            {sortField === 'createdAt' && (
                                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                            )}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('status')}
                        >
                            Status
                            {sortField === 'status' && (
                                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                            )}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('passed')}
                        >
                            Passed
                            {sortField === 'passed' && (
                                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                            )}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('failed')}
                        >
                            Failed
                            {sortField === 'failed' && (
                                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                            )}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedResults.map((result) => (
                        <tr key={result._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {format(new Date(result.createdAt), 'PPpp')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        result.status === 'passed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {result.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {result.results.passed}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {result.results.failed}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => onViewDetails(result._id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestResultsTable;