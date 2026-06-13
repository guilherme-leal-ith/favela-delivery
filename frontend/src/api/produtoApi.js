import api from './client';

export const produtoApi = {
  criar: (body) => api.post('/api/produtos', body),
  listar: () => api.get('/api/produtos'),
  buscar: (id) => api.get(`/api/produtos/${id}`),
  porEstabelecimento: (id) => api.get(`/api/produtos/estabelecimento/${id}`),
  editar: (id, body) => api.put(`/api/produtos/${id}`, body),
  remover: (id) => api.delete(`/api/produtos/${id}`),
  avaliar: (produtoId, body) => api.post(`/api/produtos/${produtoId}/avaliacoes`, body),
  avaliacoes: (produtoId) => api.get(`/api/produtos/${produtoId}/avaliacoes`),
  media: (produtoId) => api.get(`/api/produtos/${produtoId}/avaliacoes/media`),
};
