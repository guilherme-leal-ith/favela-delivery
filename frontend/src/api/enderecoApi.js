import api from './client';

export const enderecoApi = {
  criar: (body) => api.post('/api/enderecos', body),
  porConsumidor: (id) => api.get(`/api/enderecos/consumidor/${id}`),
  editar: (id, body) => api.put(`/api/enderecos/${id}`, body),
  remover: (id) => api.delete(`/api/enderecos/${id}`),
};
