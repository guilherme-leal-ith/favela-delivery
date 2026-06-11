import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { pedidosDisponiveisMock } from '../../mocks/data';
import { entregadorNav } from './nav';

export default function EmAndamento() {
  const [pedido, setPedido] = useState(() => JSON.parse(localStorage.getItem('favelafood:entregaAtual') || 'null') || pedidosDisponiveisMock[0]);
  const [error, setError] = useState('');

  async function confirmar() {
    try {
      await pedidoApi.editar(pedido.id, { status: 'ENTREGUE' });
      localStorage.removeItem('favelafood:entregaAtual');
      setPedido(null);
    } catch {
      setError('Nao foi possivel confirmar a entrega.');
    }
  }

  return (
    <MobileLayout navItems={entregadorNav}>
      <h2>Em andamento</h2>
      <ErrorMessage message={error} />
      {!pedido ? <p>Nenhuma entrega em andamento.</p> : (
        <div className="card stack">
          <h3>{pedido.estabelecimento}</h3>
          <p>{pedido.endereco}</p>
          <div className="reference-box">{pedido.ponto_referencia}</div>
          <button className="btn success" onClick={confirmar}>Confirmar Entrega</button>
        </div>
      )}
    </MobileLayout>
  );
}
