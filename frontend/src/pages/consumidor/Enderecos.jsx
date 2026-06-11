import { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import { enderecosMock } from '../../mocks/data';
import { consumidorNav } from './nav';

export default function Enderecos() {
  const [enderecos, setEnderecos] = useState(enderecosMock);
  const [form, setForm] = useState({ logradouro: '', numero: '', ponto_referencia: '' });

  function add(event) {
    event.preventDefault();
    setEnderecos([...enderecos, { id: Date.now(), ...form }]);
    setForm({ logradouro: '', numero: '', ponto_referencia: '' });
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Enderecos</h2>
      <div className="list">
        {enderecos.map((endereco) => (
          <div className="card" key={endereco.id}>
            <div className="row"><strong>{endereco.logradouro}, {endereco.numero || 's/n'}</strong><button className="btn ghost small" onClick={() => setEnderecos(enderecos.filter((item) => item.id !== endereco.id))}>Remover</button></div>
            <div className="reference-box">{endereco.ponto_referencia}</div>
          </div>
        ))}
      </div>
      <form className="form panel" onSubmit={add}>
        <label className="field">Logradouro<input className="input" value={form.logradouro} onChange={(e) => setForm({ ...form, logradouro: e.target.value })} required /></label>
        <label className="field">Numero<input className="input" value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} /></label>
        <label className="field">Ponto de referencia<textarea className="textarea reference-box" value={form.ponto_referencia} onChange={(e) => setForm({ ...form, ponto_referencia: e.target.value })} required /></label>
        <button className="btn">Adicionar endereco</button>
      </form>
    </MobileLayout>
  );
}
