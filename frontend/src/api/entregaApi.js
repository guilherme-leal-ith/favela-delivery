import api from './client';

export const entregaApi = {
  disponiveis: () => api.get('/api/entregas/disponiveis'),
  aceitar: (pedidoId, entregadorId) => api.put(`/api/entregas/${pedidoId}/aceitar/${entregadorId}`),
  concluir: (pedidoId) => api.put(`/api/entregas/${pedidoId}/concluir`),
};
