import React, { useState } from 'react';
import { useAuth } from '../../services/contexts/authContext';

export function Login() {
  const { loginGlobal } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const usuarioLogado = await loginGlobal(email, senha);
      
      // Lógica de Redirecionamento baseada nas Regras de Negócio do FavelaFood
      if (usuarioLogado.tipo === 'CONSUMIDOR') {
        window.location.href = '/dashboard-cliente';
      } else if (usuarioLogado.tipo === 'ESTABELECIMENTO') {
        window.location.href = '/painel-loja';
      } else if (usuarioLogado.tipo === 'ENTREGADOR') {
        window.location.href = '/entregas-disponiveis';
      }
    } catch (err) {
      setErro(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          Login <span className="text-yellow-500">FavelaFood</span>
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Acesse sua conta para pedir ou gerenciar entregas.
        </p>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password" required value={senha} onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit" disabled={carregando}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">
            Cadastre-se aqui
          </a>
        </div>
      </div>
    </div>
  );
}