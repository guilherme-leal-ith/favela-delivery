import api from './client';

export const estabelecimentoApi = {
  listar: () => api.get('/api/estabelecimento'),
  criar: (body) => api.post('/api/estabelecimento', body),
  buscar: (id) => api.get(`/api/estabelecimento/${id}`),
  editar: (id, body) => api.put(`/api/estabelecimento/${id}`, body),
  remover: (id) => api.delete(`/api/estabelecimento/${id}`),
  produtos: (id) => api.get(`/api/estabelecimento/${id}/produtos`),
  funcionamento: (id, aberto) => api.put(`/api/estabelecimento/${id}/funcionamento`, { is_aberto: aberto }),
};
