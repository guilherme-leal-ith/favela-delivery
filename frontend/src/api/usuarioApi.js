import api from './client';

export const usuarioApi = {
  criar: (body) => api.post('/api/usuarios', body),
  buscar: (id) => api.get(`/api/usuarios/${id}`),
  editar: (id, body) => api.put(`/api/usuarios/${id}`, body),
  remover: (id) => api.delete(`/api/usuarios/${id}`),
};
