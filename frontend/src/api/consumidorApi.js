import api from './client';

export const consumidorApi = {
  criar: (body) => api.post('/api/consumidores', body),
  buscar: (id) => api.get(`/api/consumidores/${id}`),
  editar: (id, body) => api.put(`/api/consumidores/${id}`, body),
  remover: (id) => api.delete(`/api/consumidores/${id}`),
};
