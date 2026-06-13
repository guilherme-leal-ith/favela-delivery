import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import StatusBadge from '../../components/StatusBadge';
import MobileLayout from '../../layouts/MobileLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { consumidorNav } from './nav';

const steps = ['PENDENTE', 'EM_PREPARO', 'A_CAMINHO', 'ENTREGUE'];

export default function PedidoAtivo() {
  const { user } = useAuth();
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await pedidoApi.porConsumidor(user.id);
        const pedidos = Array.isArray(response.data) ? response.data : [response.data];
        setPedido(pedidos.find((item) => !['ENTREGUE', 'CANCELADO', 'RECUSADO'].includes(item.status)) || null);
      } catch {
        setError('Nao foi possivel carregar o pedido ativo.');
      }
    }
    load();
  }, [user.id]);

  async function mudarStatus(status) {
    try {
      await pedidoApi.editar(pedido.id, { ...pedido, status });
      setPedido({ ...pedido, status });
    } catch {
      setError('Nao foi possivel atualizar o pedido.');
    }
  }

  if (!pedido) return <MobileLayout navItems={consumidorNav}><p>Nenhum pedido ativo.</p></MobileLayout>;
  const activeIndex = steps.indexOf(pedido.status);

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Pedido ativo</h2>
      <ErrorMessage message={error} />
      <div className="panel"><div className="row"><strong>{pedido.estabelecimento}</strong><StatusBadge status={pedido.status} /></div></div>
      <div className="stepper">{steps.map((step, index) => <div key={step} className={index <= activeIndex ? 'step active' : 'step'}>{step.replace('_', ' ')}</div>)}</div>
      <div className="card"><strong>Itens</strong>{(pedido.itens || []).map((item) => <p key={`${item.produto_id}-${item.nome}`}>{item.quantidade}x {item.nome}</p>)}</div>
      {pedido.status === 'PENDENTE' && <button className="btn neutral" onClick={() => mudarStatus('CANCELADO')}>Cancelar Pedido</button>}
      {pedido.status === 'A_CAMINHO' && <button className="btn success" onClick={() => mudarStatus('ENTREGUE')}>Confirmar Recebimento</button>}
    </MobileLayout>
  );
}
