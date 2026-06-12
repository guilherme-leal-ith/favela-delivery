import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import Cadastro from '../pages/auth/Cadastro';
import Home from '../pages/consumidor/Home';
import Estabelecimento from '../pages/consumidor/Estabelecimento';
import Carrinho from '../pages/consumidor/Carrinho';
import PedidoAtivo from '../pages/consumidor/PedidoAtivo';
import HistoricoConsumidor from '../pages/consumidor/Historico';
import Avaliacao from '../pages/consumidor/Avaliacao';
import PerfilConsumidor from '../pages/consumidor/Perfil';
import Enderecos from '../pages/consumidor/Enderecos';
import EstDashboard from '../pages/estabelecimento/Dashboard';
import EstPedidos from '../pages/estabelecimento/Pedidos';
import Catalogo from '../pages/estabelecimento/Catalogo';
import EstHistorico from '../pages/estabelecimento/Historico';
import EstPerfil from '../pages/estabelecimento/Perfil';
import Disponiveis from '../pages/entregador/Disponiveis';
import EmAndamento from '../pages/entregador/EmAndamento';
import EntHistorico from '../pages/entregador/Historico';
import EntPerfil from '../pages/entregador/Perfil';
import CadastrosPendentes from '../pages/admin/CadastrosPendentes';
import AdminEstabelecimentos from '../pages/admin/Estabelecimentos';
import Metricas from '../pages/admin/Metricas';
import AdminSair from '../pages/admin/Sair';

function startPath(tipo) {
  return {
    CONSUMIDOR: '/consumidor/home',
    ESTABELECIMENTO: '/estabelecimento/dashboard',
    ENTREGADOR: '/entregador/disponiveis',
    ADMINISTRADOR: '/admin/cadastros',
  }[tipo] || '/login';
}

function Protected({ tipo, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (tipo && user.tipo_usuario !== tipo) return <Navigate to={startPath(user.tipo_usuario)} replace />;
  return children;
}

function RootRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? startPath(user.tipo_usuario) : '/login'} replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/consumidor/home" element={<Protected tipo="CONSUMIDOR"><Home /></Protected>} />
        <Route path="/consumidor/estabelecimento/:id" element={<Protected tipo="CONSUMIDOR"><Estabelecimento /></Protected>} />
        <Route path="/consumidor/carrinho" element={<Protected tipo="CONSUMIDOR"><Carrinho /></Protected>} />
        <Route path="/consumidor/pedido" element={<Protected tipo="CONSUMIDOR"><PedidoAtivo /></Protected>} />
        <Route path="/consumidor/historico" element={<Protected tipo="CONSUMIDOR"><HistoricoConsumidor /></Protected>} />
        <Route path="/consumidor/avaliacao/:id" element={<Protected tipo="CONSUMIDOR"><Avaliacao /></Protected>} />
        <Route path="/consumidor/perfil" element={<Protected tipo="CONSUMIDOR"><PerfilConsumidor /></Protected>} />
        <Route path="/consumidor/enderecos" element={<Protected tipo="CONSUMIDOR"><Enderecos /></Protected>} />

        <Route path="/estabelecimento/dashboard" element={<Protected tipo="ESTABELECIMENTO"><EstDashboard /></Protected>} />
        <Route path="/estabelecimento/pedidos" element={<Protected tipo="ESTABELECIMENTO"><EstPedidos /></Protected>} />
        <Route path="/estabelecimento/catalogo" element={<Protected tipo="ESTABELECIMENTO"><Catalogo /></Protected>} />
        <Route path="/estabelecimento/historico" element={<Protected tipo="ESTABELECIMENTO"><EstHistorico /></Protected>} />
        <Route path="/estabelecimento/perfil" element={<Protected tipo="ESTABELECIMENTO"><EstPerfil /></Protected>} />

        <Route path="/entregador/disponiveis" element={<Protected tipo="ENTREGADOR"><Disponiveis /></Protected>} />
        <Route path="/entregador/andamento" element={<Protected tipo="ENTREGADOR"><EmAndamento /></Protected>} />
        <Route path="/entregador/historico" element={<Protected tipo="ENTREGADOR"><EntHistorico /></Protected>} />
        <Route path="/entregador/perfil" element={<Protected tipo="ENTREGADOR"><EntPerfil /></Protected>} />

        <Route path="/admin/cadastros" element={<Protected tipo="ADMINISTRADOR"><CadastrosPendentes /></Protected>} />
        <Route path="/admin/estabelecimentos" element={<Protected tipo="ADMINISTRADOR"><AdminEstabelecimentos /></Protected>} />
        <Route path="/admin/metricas" element={<Protected tipo="ADMINISTRADOR"><Metricas /></Protected>} />
        <Route path="/admin/sair" element={<Protected tipo="ADMINISTRADOR"><AdminSair /></Protected>} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
