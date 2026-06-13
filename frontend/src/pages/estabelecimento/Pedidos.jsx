import { useCallback, useEffect, useState } from 'react';
import CountdownTimer from '../../components/CountdownTimer';
import ErrorMessage from '../../components/ErrorMessage';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../layouts/DashboardLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentoNav } from './nav';

export default function Pedidos() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await pedidoApi.porEstabelecimento(user.id);
        setPedidos(response.data);
      } catch {
        setError('Nao foi possivel carregar os pedidos.');
      }
    }
    load();
  }, [user.id]);

  const mudar = useCallback(async (id, status) => {
    setPedidos((current) => current.map((pedido) => pedido.id === id ? { ...pedido, status } : pedido));
    try {
      await pedidoApi.editar(id, { status });
    } catch {
      setError('Nao foi possivel atualizar um pedido.');
    }
  }, []);

  return (
    <DashboardLayout title="Pedidos recebidos" navItems={estabelecimentoNav}>
      <ErrorMessage message={error} />
      <h2>Pendentes</h2>
      <div className="list">
        {pedidos.filter((p) => p.status === 'PENDENTE').map((pedido) => (
          <div className="card" key={pedido.id}>
            <div className="row"><strong>{pedido.horario}</strong><CountdownTimer seconds={600} onExpire={() => mudar(pedido.id, 'RECUSADO')} /></div>
            <p>{(pedido.itens || []).map((item) => `${item.quantidade}x ${item.nome}`).join(', ')}</p>
            <div className="row"><strong>R$ {Number(pedido.valor_total || 0).toFixed(2)}</strong><div className="row"><button className="btn success small" onClick={() => mudar(pedido.id, 'EM_PREPARO')}>Aceitar</button><button className="btn neutral small" onClick={() => mudar(pedido.id, 'RECUSADO')}>Recusar</button></div></div>
          </div>
        ))}
      </div>
      <h2>Em andamento</h2>
      <div className="list">
        {pedidos.filter((p) => ['EM_PREPARO', 'A_CAMINHO'].includes(p.status)).map((pedido) => (
          <div className="card row" key={pedido.id}><div><strong>{(pedido.itens || []).map((item) => `${item.quantidade}x ${item.nome}`).join(', ')}</strong><p className="muted">R$ {Number(pedido.valor_total || 0).toFixed(2)}</p></div><StatusBadge status={pedido.status} /></div>
        ))}
      </div>
    </DashboardLayout>
  );
}
