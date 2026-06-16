import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { useAuth } from '../../context/AuthContext';
import MobileLayout from '../../layouts/MobileLayout';
import { authApi } from '../../api/authApi';

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

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      console.log("MANDANDO EMAIL PARA O JAVA...");
      const response = await authApi.login(form);
      const dadosUsuario = {
      ...response.data,
      tipo_usuario: response.data.tipoUsuario // Duplica o valor para o padrão que o React usa nas rotas
    };
      login(dadosUsuario);
      
      console.log("ROTA DE DESTINO:", redirectPath(dadosUsuario.tipo_usuario));
      navigate(redirectPath(dadosUsuario.tipo_usuario));
    } catch {
      setError('Email ou senha invalidos.');
    }
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
        <Link className="link-button" to="/cadastro">Ainda não tem conta? Cadastre-se</Link>
      </div>
    </MobileLayout>
  );
}
