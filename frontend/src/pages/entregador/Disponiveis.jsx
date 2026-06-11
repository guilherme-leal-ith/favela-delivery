import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { pedidosDisponiveisMock } from '../../mocks/data';
import { entregadorNav } from './nav';

export default function Disponiveis() {
  const [pedidos, setPedidos] = useState(pedidosDisponiveisMock);
  const [error, setError] = useState('');
  const { user } = useAuth();

  async function aceitar(id) {
    try {
      await pedidoApi.editar(id, { fk_entregador_id: user.id, status: 'A_CAMINHO' });
      localStorage.setItem('favelafood:entregaAtual', JSON.stringify(pedidos.find((p) => p.id === id)));
      setPedidos(pedidos.filter((p) => p.id !== id));
    } catch {
      setError('Nao foi possivel aceitar a entrega.');
    }
  }

  return (
    <MobileLayout navItems={entregadorNav}>
      <h2>Pedidos disponiveis</h2>
      <ErrorMessage message={error} />
      <div className="list">
        {pedidos.map((pedido) => (
          <div className="card" key={pedido.id}>
            <h3>{pedido.estabelecimento}</h3>
            <p>{pedido.endereco}</p>
            <div className="reference-box">{pedido.ponto_referencia}</div>
            <div className="row"><strong>R$ {pedido.valor_total.toFixed(2)}</strong><button className="btn small" onClick={() => aceitar(pedido.id)}>Aceitar Entrega</button></div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
