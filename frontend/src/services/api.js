import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // nota para eu não me esquecer de mudar para o URL do nosso backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@FavelaFood:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;