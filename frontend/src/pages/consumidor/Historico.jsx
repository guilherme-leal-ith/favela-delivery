import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import MobileLayout from '../../layouts/MobileLayout';
import ErrorMessage from '../../components/ErrorMessage';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { consumidorNav } from './nav';

export default function Historico() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await pedidoApi.porConsumidor(user.id);
        setPedidos(response.data);
      } catch {
        setError('Nao foi possivel carregar seu historico.');
      }
    }
    load();
  }, [user.id]);

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Historico</h2>
      <ErrorMessage message={error} />
      <div className="list">
        {pedidos.map((pedido) => (
          <div className="card" key={pedido.id}>
            <div className="row"><strong>{pedido.estabelecimento}</strong><StatusBadge status={pedido.status} /></div>
            <p className="muted">{pedido.data_hora}</p>
            <div className="row"><strong>R$ {Number(pedido.valor_total || 0).toFixed(2)}</strong>{pedido.status === 'ENTREGUE' && <Link className="btn small" to={`/consumidor/avaliacao/${pedido.id}`}>Avaliar</Link>}</div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
