import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { useAuth } from '../../context/AuthContext';
import MobileLayout from '../../layouts/MobileLayout';

const demoUsers = {
  consumidor: { id: 1, nome: 'Ana Souza', email: 'ana@favelafood.com', tipo_usuario: 'CONSUMIDOR' },
  estabelecimento: { id: 9, nome: 'Burguer Palace', email: 'loja@favelafood.com', tipo_usuario: 'ESTABELECIMENTO' },
  entregador: { id: 3, nome: 'Joao Motoboy', email: 'joao@favelafood.com', tipo_usuario: 'ENTREGADOR' },
  admin: { id: 99, nome: 'Admin FavelaFood', email: 'admin@favelafood.com', tipo_usuario: 'ADMINISTRADOR' },
};

function redirectPath(tipo) {
  return {
    CONSUMIDOR: '/consumidor/home',
    ESTABELECIMENTO: '/estabelecimento/dashboard',
    ENTREGADOR: '/entregador/disponiveis',
    ADMINISTRADOR: '/admin/cadastros',
  }[tipo];
}

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    setError('');
    const key = form.email.split('@')[0].toLowerCase();
    const user = demoUsers[key] || demoUsers.consumidor;
    login({ ...user, email: form.email || user.email });
    navigate(redirectPath(user.tipo_usuario));
  }

  return (
    <MobileLayout>
      <div className="mobile-content auth">
        <div className="brand">
          <h1>FavelaFood</h1>
          <p>Delivery da favela, pra favela</p>
        </div>
        <form className="form" onSubmit={submit}>
          <ErrorMessage message={error} />
          <label className="field">Email<input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="field">Senha<input className="input" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} /></label>
          <button className="btn" type="submit">Entrar</button>
        </form>
        <p className="muted">Use consumidor@, estabelecimento@, entregador@ ou admin@ para navegar como perfil demo.</p>
        <Link className="link-button" to="/cadastro">Ainda não tem conta? Cadastre-se</Link>
      </div>
    </MobileLayout>
  );
}
