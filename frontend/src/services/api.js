import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // nota para eu não me esquecer de mudar para o URL do nosso backend
});

export default api;