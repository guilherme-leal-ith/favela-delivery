import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminApi } from '../../api/adminApi';
import { adminNav } from './nav';

export default function Metricas() {
  const [metricas, setMetricas] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await adminApi.metricas();
        setMetricas(response.data);
      } catch {
        setError('Nao foi possivel carregar metricas.');
      }
    }
    load();
  }, []);

  const data = metricas || { totalConsumidores: 0, totalEntregadores: 0, totalEstabelecimentos: 0, pedidosHoje: 0, pedidosPorDia: [] };

  return (
    <DashboardLayout title="Metricas" navItems={adminNav}>
      <ErrorMessage message={error} />
      <div className="grid grid-3">
        <div className="card"><p className="muted">Consumidores</p><h2>{data.totalConsumidores}</h2></div>
        <div className="card"><p className="muted">Entregadores</p><h2>{data.totalEntregadores}</h2></div>
        <div className="card"><p className="muted">Estabelecimentos</p><h2>{data.totalEstabelecimentos}</h2></div>
        <div className="card"><p className="muted">Pedidos hoje</p><h2>{data.pedidosHoje}</h2></div>
      </div>
      <div className="panel">
        <h2>Pedidos por dia</h2>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={data.pedidosPorDia}>
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
