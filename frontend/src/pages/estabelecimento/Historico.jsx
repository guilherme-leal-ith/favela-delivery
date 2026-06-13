import { useEffect, useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../layouts/DashboardLayout';
import ErrorMessage from '../../components/ErrorMessage';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentoNav } from './nav';

export default function Historico() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await pedidoApi.porEstabelecimento(user.id);
        setPedidos(response.data);
      } catch {
        setError('Nao foi possivel carregar o historico.');
      }
    }
    load();
  }, [user.id]);

  return (
    <DashboardLayout title="Historico" navItems={estabelecimentoNav}>
      <ErrorMessage message={error} />
      <div className="list">
        {pedidos.map((pedido) => <div className="card row" key={pedido.id}><div><strong>{pedido.data_hora}</strong><p>R$ {Number(pedido.valor_total || 0).toFixed(2)}</p></div><StatusBadge status={pedido.status} /></div>)}
      </div>
    </DashboardLayout>
  );
}
