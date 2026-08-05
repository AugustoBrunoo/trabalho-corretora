import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('🚨 API BASE URL ATUAL:', BASE_URL);

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;