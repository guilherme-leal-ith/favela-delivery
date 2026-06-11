import MobileLayout from '../../layouts/MobileLayout';
import { pedidosMock } from '../../mocks/data';
import { entregadorNav } from './nav';

export default function Historico() {
  return (
    <MobileLayout navItems={entregadorNav}>
      <h2>Historico</h2>
      <div className="list">
        {pedidosMock.filter((p) => p.status === 'ENTREGUE').map((pedido) => <div className="card row" key={pedido.id}><div><strong>{pedido.estabelecimento}</strong><p className="muted">{pedido.data_hora}</p></div><strong>R$ {pedido.valor_total.toFixed(2)}</strong></div>)}
      </div>
    </MobileLayout>
  );
}
