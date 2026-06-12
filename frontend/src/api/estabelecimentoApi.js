import api from './client';

export const estabelecimentoApi = {
  criar: (body) => api.post('/api/estabelecimentos', body),
  buscar: (id) => api.get(`/api/estabelecimentos/${id}`),
  editar: (id, body) => api.put(`/api/estabelecimentos/${id}`, body),
  remover: (id) => api.delete(`/api/estabelecimentos/${id}`),
};
