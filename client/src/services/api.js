import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const testService = {
    executeTest: async (script, language, mode) => {
        try {
            const response = await api.post('/api/test/execute', {
                script,
                language,
                mode
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error executing test');
        }
    },

    generateTestScript: async (applicationUrl, hints) => {
        try {
            const response = await api.post('/api/test/generate', {
                applicationUrl,
                hints
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error generating test script');
        }
    }
};

export default api;