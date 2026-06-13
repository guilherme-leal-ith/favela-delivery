import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminApi } from '../../api/adminApi';
import { estabelecimentoApi } from '../../api/estabelecimentoApi';
import { adminNav } from './nav';

export default function Estabelecimentos() {
  const [lojas, setLojas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await estabelecimentoApi.listar();
        setLojas(response.data);
      } catch {
        setError('Nao foi possivel carregar estabelecimentos.');
      }
    }
    load();
  }, []);

  async function bloquear(id) {
    try {
      await adminApi.bloquear(id);
      setLojas(lojas.map((item) => item.id === id ? { ...item, isAberto: false } : item));
    } catch {
      setError('Nao foi possivel bloquear.');
    }
  }

  return (
    <DashboardLayout title="Estabelecimentos ativos" navItems={adminNav}>
      <ErrorMessage message={error} />
      <table className="table">
        <thead><tr><th>Nome</th><th>Categoria</th><th>Nota</th><th>Status</th><th>Acoes</th></tr></thead>
        <tbody>
          {lojas.map((loja) => (
            <tr key={loja.id}>
              <td>{loja.nome}</td><td>{loja.categoria}</td><td>{loja.nota}</td><td>{loja.isAberto ? 'Ativo' : 'Bloqueado'}</td>
              <td><button className="btn neutral small" onClick={() => bloquear(loja.id)}>Bloquear</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
