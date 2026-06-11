import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { estabelecimentosMock } from '../../mocks/data';
import { adminNav } from './nav';

export default function Estabelecimentos() {
  const [lojas, setLojas] = useState(estabelecimentosMock.map((loja) => ({ ...loja, bloqueado: false })));

  return (
    <DashboardLayout title="Estabelecimentos ativos" navItems={adminNav}>
      <table className="table">
        <thead><tr><th>Nome</th><th>Categoria</th><th>Nota</th><th>Status</th><th>Acoes</th></tr></thead>
        <tbody>
          {lojas.map((loja) => (
            <tr key={loja.id}>
              <td>{loja.nome}</td><td>{loja.categoria}</td><td>{loja.nota}</td><td>{loja.bloqueado ? 'Bloqueado' : 'Ativo'}</td>
              <td><button className="btn neutral small" onClick={() => setLojas(lojas.map((item) => item.id === loja.id ? { ...item, bloqueado: !item.bloqueado } : item))}>{loja.bloqueado ? 'Desbloquear' : 'Bloquear'}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
