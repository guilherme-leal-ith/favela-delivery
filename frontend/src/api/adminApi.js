import api from './client';

export const adminApi = {
  pendentes: () => api.get('/api/admin/estabelecimentos/pendentes'),
  aprovar: (id) => api.put(`/api/admin/estabelecimentos/${id}/aprovar`),
  rejeitar: (id) => api.put(`/api/admin/estabelecimentos/${id}/rejeitar`),
  bloquear: (id) => api.put(`/api/admin/estabelecimentos/${id}/bloquear`),
  metricas: () => api.get('/api/admin/metricas'),
};
