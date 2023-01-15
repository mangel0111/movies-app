import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

// normally I would setup headers like Authorization here, with a request interceptor

export default api;
