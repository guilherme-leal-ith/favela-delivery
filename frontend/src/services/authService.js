import api from './api';
export const authService = {
  cadastrar: async (dadosUsuario) => {
    try {
      const response = await api.post('/usuarios/cadastro', dadosUsuario);
      return response.data;
    } catch (error) {
      throw error.response?.data?.mensagem || 'Erro ao realizar o cadastro.';
    }
  },

  // ADICIONE ESTA FUNÇÃO:
  login: async (email, senha) => {
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      return response.data;
    } catch (error) {
      throw error.response?.data?.mensagem || 'E-mail ou senha incorretos.';
    }
  }
};