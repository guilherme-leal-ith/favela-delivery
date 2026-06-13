import { useEffect, useMemo, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { estabelecimentoApi } from '../../api/estabelecimentoApi';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentoNav } from './nav';

export default function Dashboard() {
  const [aberto, setAberto] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const pendentes = pedidos.filter((pedido) => pedido.status === 'PENDENTE').length;
  const faturamento = useMemo(() => pedidos.reduce((sum, pedido) => sum + Number(pedido.valor_total || 0), 0), [pedidos]);

  useEffect(() => {
    async function load() {
      try {
        const [lojaResponse, pedidosResponse] = await Promise.all([
          estabelecimentoApi.buscar(user.id),
          pedidoApi.porEstabelecimento(user.id),
        ]);
        setAberto(Boolean(lojaResponse.data.isAberto));
        setPedidos(pedidosResponse.data);
      } catch {
        setError('Nao foi possivel carregar o dashboard.');
      }
    }
    load();
  }, [user.id]);

  async function toggle() {
    const next = !aberto;
    setAberto(next);
    try {
      await estabelecimentoApi.funcionamento(user.id, next);
    } catch {
      setError('Nao foi possivel atualizar o funcionamento.');
    }
  }

  return (
    <DashboardLayout title="Dashboard" navItems={estabelecimentoNav}>
      <ErrorMessage message={error} />
      <div className="panel row"><h2>Status de funcionamento</h2><button className={aberto ? 'toggle on' : 'toggle'} onClick={toggle}>{aberto ? 'Aberto' : 'Fechado'}</button></div>
      <div className="grid grid-3">
        <div className="card"><p className="muted">Pedidos hoje</p><h2>{pedidos.length}</h2></div>
        <div className="card"><p className="muted">Pendentes</p><h2>{pendentes}</h2></div>
        <div className="card"><p className="muted">Faturamento estimado</p><h2>R$ {faturamento.toFixed(2)}</h2></div>
      </div>
    </DashboardLayout>
  );
}
