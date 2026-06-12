import api from './client';

export const entregadorApi = {
  criar: (body) => api.post('/api/entregadores', body),
  buscar: (id) => api.get(`/api/entregadores/${id}`),
  editar: (id, body) => api.put(`/api/entregadores/${id}`, body),
  remover: (id) => api.delete(`/api/entregadores/${id}`),
};
