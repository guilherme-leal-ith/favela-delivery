import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { entregaApi } from '../../api/entregaApi';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { entregadorNav } from './nav';

export default function EmAndamento() {
  const { user } = useAuth();
  const [pedido, setPedido] = useState(() => JSON.parse(localStorage.getItem('favelafood:entregaAtual') || 'null'));
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await pedidoApi.porEntregador(user.id);
        setPedido(response.data.find((item) => item.status === 'A_CAMINHO') || null);
      } catch {
        setError('Nao foi possivel carregar a entrega em andamento.');
      }
    }
    load();
  }, [user.id]);

  async function confirmar() {
    try {
      await entregaApi.concluir(pedido.id);
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
