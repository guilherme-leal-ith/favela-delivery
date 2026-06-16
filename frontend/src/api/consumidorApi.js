import api from './client';

export const consumidorApi = {
  criar: (body) => api.post('/api/consumidor', body),
  buscar: (id) => api.get(`/api/consumidor/${id}`),
  editar: (id, body) => api.put(`/api/consumidor/${id}`, body),
  remover: (id) => api.delete(`/api/consumidor/${id}`),
};
