import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5001/api', // or http://localhost:5000/api
});

// Add JWT to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
