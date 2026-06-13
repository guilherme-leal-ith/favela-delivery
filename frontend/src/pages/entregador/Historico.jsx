import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { entregadorNav } from './nav';

export default function Historico() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await pedidoApi.porEntregador(user.id);
        setPedidos(response.data);
      } catch {
        setError('Nao foi possivel carregar o historico.');
      }
    }
    load();
  }, [user.id]);

  return (
    <MobileLayout navItems={entregadorNav}>
      <h2>Historico</h2>
      <ErrorMessage message={error} />
      <div className="list">
        {pedidos.filter((p) => p.status === 'ENTREGUE').map((pedido) => <div className="card row" key={pedido.id}><div><strong>{pedido.estabelecimento}</strong><p className="muted">{pedido.data_hora}</p></div><strong>R$ {Number(pedido.valor_total || 0).toFixed(2)}</strong></div>)}
      </div>
    </MobileLayout>
  );
}
