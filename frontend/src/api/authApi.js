import api from './client';

export const authApi = {
  /*login: (body) => api.post('/api/auth/login', body),*/
  /*login: (email) => api.get(`/api/user/email/${email}`),*/
  /*login: (body) => api.get(`/api/user/email/${body.email}`),*/
  login: async (form) => {
   return api.post('/api/user/login', {
      email: form.email,
      senha: form.senha
    });
  }
};
