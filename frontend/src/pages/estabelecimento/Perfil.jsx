import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { estabelecimentoApi } from '../../api/estabelecimentoApi';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentoNav } from './nav';

export default function Perfil() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ nome: user.nome, email: user.email, cnpj: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const response = await estabelecimentoApi.buscar(user.id);
        setForm({
          nome: response.data.nome || user.nome,
          email: user.email,
          cnpj: response.data.cnpj || '',
        });
      } catch {
        setError('Nao foi possivel carregar o perfil.');
      }
    }
    load();
  }, [user.email, user.id, user.nome]);

  async function submit(event) {
    event.preventDefault();
    try {
      await estabelecimentoApi.editar(user.id, form);
    } catch {
      setError('Nao foi possivel salvar o perfil.');
    }
  }

  return (
    <DashboardLayout title="Perfil" navItems={estabelecimentoNav}>
      <ErrorMessage message={error} />
      <form className="form panel" onSubmit={submit}>
        <label className="field">Nome<input className="input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} /></label>
        <label className="field">Email<input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="field">CNPJ<input className="input" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} /></label>
        <button className="btn">Salvar</button>
      </form>
      <button className="btn neutral" onClick={() => { logout(); navigate('/login'); }}>Sair</button>
    </DashboardLayout>
  );
}
