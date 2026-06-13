import api from './client';

export const estabelecimentoApi = {
  listar: () => api.get('/api/estabelecimentos'),
  criar: (body) => api.post('/api/estabelecimentos', body),
  buscar: (id) => api.get(`/api/estabelecimentos/${id}`),
  editar: (id, body) => api.put(`/api/estabelecimentos/${id}`, body),
  remover: (id) => api.delete(`/api/estabelecimentos/${id}`),
  produtos: (id) => api.get(`/api/estabelecimentos/${id}/produtos`),
  funcionamento: (id, aberto) => api.put(`/api/estabelecimentos/${id}/funcionamento`, { is_aberto: aberto }),
};
