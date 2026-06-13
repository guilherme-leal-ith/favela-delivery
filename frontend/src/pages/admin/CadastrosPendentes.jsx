import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminApi } from '../../api/adminApi';
import { adminNav } from './nav';

export default function CadastrosPendentes() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await adminApi.pendentes();
        setItems(response.data);
      } catch {
        setError('Nao foi possivel carregar os cadastros.');
      }
    }
    load();
  }, []);

  async function decidir(id, aprovado) {
    try {
      if (aprovado) await adminApi.aprovar(id);
      else await adminApi.rejeitar(id);
      setItems(items.filter((item) => item.id !== id));
    } catch {
      setError('Nao foi possivel atualizar o cadastro.');
    }
  }

  return (
    <DashboardLayout title="Cadastros pendentes" navItems={adminNav}>
      <ErrorMessage message={error} />
      <div className="list">
        {items.map((item) => (
          <div className="card row" key={item.id}>
            <div><strong>{item.nome}</strong><p className="muted">{item.cnpj}</p></div>
            <div className="row"><button className="btn success small" onClick={() => decidir(item.id, true)}>Aprovar</button><button className="btn neutral small" onClick={() => decidir(item.id, false)}>Rejeitar</button></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
