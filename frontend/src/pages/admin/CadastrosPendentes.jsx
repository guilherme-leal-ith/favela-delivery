import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminNav } from './nav';

const initial = [
  { id: 1, nome: 'Marmita da Laje', cnpj: '11.222.333/0001-44', data: '2026-06-01' },
  { id: 2, nome: 'Acai do Alto', cnpj: '22.333.444/0001-55', data: '2026-06-03' },
];

export default function CadastrosPendentes() {
  const [items, setItems] = useState(initial);

  function decidir(id) {
    // TODO: conectar endpoint de aprovacao/rejeicao de estabelecimento.
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <DashboardLayout title="Cadastros pendentes" navItems={adminNav}>
      <div className="list">
        {items.map((item) => (
          <div className="card row" key={item.id}>
            <div><strong>{item.nome}</strong><p className="muted">{item.cnpj} - {item.data}</p></div>
            <div className="row"><button className="btn success small" onClick={() => decidir(item.id)}>Aprovar</button><button className="btn neutral small" onClick={() => decidir(item.id)}>Rejeitar</button></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
