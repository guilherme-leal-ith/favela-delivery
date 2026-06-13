import api from './client';

export const authApi = {
  login: (body) => api.post('/api/auth/login', body),
};
