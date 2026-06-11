import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../layouts/DashboardLayout';
import { pedidosMock } from '../../mocks/data';
import { estabelecimentoNav } from './nav';

export default function Historico() {
  return (
    <DashboardLayout title="Historico" navItems={estabelecimentoNav}>
      <div className="list">
        {pedidosMock.map((pedido) => <div className="card row" key={pedido.id}><div><strong>{pedido.data_hora}</strong><p>R$ {pedido.valor_total.toFixed(2)}</p></div><StatusBadge status={pedido.status} /></div>)}
      </div>
    </DashboardLayout>
  );
}
