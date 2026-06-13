import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { enderecoApi } from '../../api/enderecoApi';
import { useAuth } from '../../context/AuthContext';
import { consumidorNav } from './nav';

export default function Enderecos() {
  const { user } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [form, setForm] = useState({ logradouro: '', numero: '', ponto_referencia: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await enderecoApi.porConsumidor(user.id);
        setEnderecos(response.data);
      } catch {
        setError('Nao foi possivel carregar os enderecos.');
      }
    }
    load();
  }, [user.id]);

  async function add(event) {
    event.preventDefault();
    setError('');
    try {
      const response = await enderecoApi.criar({ ...form, fk_consumidor_id: user.id });
      setEnderecos([...enderecos, response.data]);
      setForm({ logradouro: '', numero: '', ponto_referencia: '' });
    } catch {
      setError('Nao foi possivel adicionar o endereco.');
    }
  }

  async function remover(id) {
    setError('');
    try {
      await enderecoApi.remover(id);
      setEnderecos(enderecos.filter((item) => item.id !== id));
    } catch {
      setError('Nao foi possivel remover o endereco.');
    }
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Enderecos</h2>
      <ErrorMessage message={error} />
      <div className="list">
        {enderecos.map((endereco) => (
          <div className="card" key={endereco.id}>
            <div className="row"><strong>{endereco.logradouro}, {endereco.numero || 's/n'}</strong><button className="btn ghost small" onClick={() => remover(endereco.id)}>Remover</button></div>
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
