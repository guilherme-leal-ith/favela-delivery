import { Link } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';
import MobileLayout from '../../layouts/MobileLayout';
import { pedidosMock } from '../../mocks/data';
import { consumidorNav } from './nav';

export default function Historico() {
  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Historico</h2>
      <div className="list">
        {pedidosMock.map((pedido) => (
          <div className="card" key={pedido.id}>
            <div className="row"><strong>{pedido.estabelecimento}</strong><StatusBadge status={pedido.status} /></div>
            <p className="muted">{pedido.data_hora}</p>
            <div className="row"><strong>R$ {pedido.valor_total.toFixed(2)}</strong>{pedido.status === 'ENTREGUE' && <Link className="btn small" to={`/consumidor/avaliacao/${pedido.id}`}>Avaliar</Link>}</div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
