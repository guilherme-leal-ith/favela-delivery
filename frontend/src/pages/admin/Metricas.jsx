import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import { metricasMock } from '../../mocks/data';
import { adminNav } from './nav';

export default function Metricas() {
  return (
    <DashboardLayout title="Metricas" navItems={adminNav}>
      <div className="grid grid-3">
        <div className="card"><p className="muted">Consumidores</p><h2>{metricasMock.totalConsumidores}</h2></div>
        <div className="card"><p className="muted">Entregadores</p><h2>{metricasMock.totalEntregadores}</h2></div>
        <div className="card"><p className="muted">Estabelecimentos</p><h2>{metricasMock.totalEstabelecimentos}</h2></div>
        <div className="card"><p className="muted">Pedidos hoje</p><h2>{metricasMock.pedidosHoje}</h2></div>
      </div>
      <div className="panel">
        <h2>Pedidos por dia</h2>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={metricasMock.pedidosPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pedidos" fill="#E63946" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
