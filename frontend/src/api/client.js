import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.REACT_APP_API_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:8081',
});

export default api;
