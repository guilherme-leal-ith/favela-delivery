import { useCallback, useState } from 'react';
import CountdownTimer from '../../components/CountdownTimer';
import ErrorMessage from '../../components/ErrorMessage';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../layouts/DashboardLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { estabelecimentoNav } from './nav';

const initial = [
  { id: 31, horario: '12:20', itens: 'X-Burguer, Batata Frita P', valor_total: 37.8, status: 'PENDENTE' },
  { id: 32, horario: '12:28', itens: 'X-Salada, Refrigerante', valor_total: 28.9, status: 'PENDENTE' },
  { id: 33, horario: '12:40', itens: 'Batata Frita G', valor_total: 16.9, status: 'EM_PREPARO' },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState(initial);
  const [error, setError] = useState('');

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
            <p>{pedido.itens}</p>
            <div className="row"><strong>R$ {pedido.valor_total.toFixed(2)}</strong><div className="row"><button className="btn success small" onClick={() => mudar(pedido.id, 'EM_PREPARO')}>Aceitar</button><button className="btn neutral small" onClick={() => mudar(pedido.id, 'RECUSADO')}>Recusar</button></div></div>
          </div>
        ))}
      </div>
      <h2>Em andamento</h2>
      <div className="list">
        {pedidos.filter((p) => ['EM_PREPARO', 'A_CAMINHO'].includes(p.status)).map((pedido) => (
          <div className="card row" key={pedido.id}><div><strong>{pedido.itens}</strong><p className="muted">R$ {pedido.valor_total.toFixed(2)}</p></div><StatusBadge status={pedido.status} /></div>
        ))}
      </div>
    </DashboardLayout>
  );
}
