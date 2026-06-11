import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { estabelecimentoApi } from '../../api/estabelecimentoApi';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentoNav } from './nav';

export default function Dashboard() {
  const [aberto, setAberto] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  async function toggle() {
    const next = !aberto;
    setAberto(next);
    try {
      await estabelecimentoApi.editar(user.id, { is_aberto: next });
    } catch {
      setError('Nao foi possivel atualizar o funcionamento.');
    }
  }

  return (
    <DashboardLayout title="Dashboard" navItems={estabelecimentoNav}>
      <ErrorMessage message={error} />
      <div className="panel row"><h2>Status de funcionamento</h2><button className={aberto ? 'toggle on' : 'toggle'} onClick={toggle}>{aberto ? 'Aberto' : 'Fechado'}</button></div>
      <div className="grid grid-3">
        <div className="card"><p className="muted">Pedidos hoje</p><h2>12</h2></div>
        <div className="card"><p className="muted">Pendentes</p><h2>3</h2></div>
        <div className="card"><p className="muted">Faturamento estimado</p><h2>R$ 842,30</h2></div>
      </div>
    </DashboardLayout>
  );
}
