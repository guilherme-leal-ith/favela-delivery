import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { entregaApi } from '../../api/entregaApi';
import { useAuth } from '../../context/AuthContext';
import { entregadorNav } from './nav';

export default function Disponiveis() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const response = await entregaApi.disponiveis();
        setPedidos(response.data);
      } catch {
        setError('Nao foi possivel carregar as entregas disponiveis.');
      }
    }
    load();
  }, []);

  async function aceitar(id) {
    try {
      await entregaApi.aceitar(id, user.id);
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
            <div className="row"><strong>R$ {Number(pedido.valor_total || 0).toFixed(2)}</strong><button className="btn small" onClick={() => aceitar(pedido.id)}>Aceitar Entrega</button></div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
