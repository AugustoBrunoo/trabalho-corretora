import axios from 'axios';

export const BASE_URL = 'https://trabalho-corretora-backend.onrender.com';

console.log('🚨 API BASE URL ATUAL:', BASE_URL);
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;