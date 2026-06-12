import api from './client';

export const pedidoApi = {
  criar: (body) => api.post('/api/pedidos', body),
  buscar: (id) => api.get(`/api/pedidos/${id}`),
  editar: (id, body) => api.put(`/api/pedidos/${id}`, body),
  remover: (id) => api.delete(`/api/pedidos/${id}`),
  porConsumidor: (id) => api.get(`/api/pedidos/consumidor/${id}`),
  porEntregador: (id) => api.get(`/api/pedidos/entregador/${id}`),
  porEstabelecimento: (id) => api.get(`/api/pedidos/estabelecimento/${id}`),
};
