import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { consumidorApi } from '../../api/consumidorApi';
import { entregadorApi } from '../../api/entregadorApi';
import { estabelecimentoApi } from '../../api/estabelecimentoApi';

const tipos = [
  { tipo: 'CONSUMIDOR', label: 'Consumidor', icon: 'C' },
  { tipo: 'ESTABELECIMENTO', label: 'Estabelecimento', icon: 'E' },
  { tipo: 'ENTREGADOR', label: 'Entregador', icon: 'D' },
];

const onlyDigits = (value) => value.replace(/\D/g, '');
const maskCpf = (value) => onlyDigits(value).slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const maskCnpj = (value) => onlyDigits(value).slice(0, 14).replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');

export default function Cadastro() {
  const [tipo, setTipo] = useState('CONSUMIDOR');
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cpf: '', cnpj: '', veiculo: 'BICICLETA', cnh: '', data_nascimento: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (tipo === 'ENTREGADOR' && form.data_nascimento) {
      const age = new Date().getFullYear() - new Date(form.data_nascimento).getFullYear();
      if (age < 18) return setError('Entregadores precisam ter pelo menos 18 anos.');
    }
    try {
      const base = { nome: form.nome, email: form.email, senha: form.senha };
      if (tipo === 'CONSUMIDOR') await consumidorApi.criar({ ...base, cpf: form.cpf });
      if (tipo === 'ESTABELECIMENTO') await estabelecimentoApi.criar({ ...base, cnpj: form.cnpj, is_aberto: false });
      if (tipo === 'ENTREGADOR') await entregadorApi.criar({ ...base, veiculo: form.veiculo, cnh: form.veiculo === 'MOTO' ? form.cnh : null, data_nascimento: form.data_nascimento, is_disponivel: true });
      navigate('/login');
    } catch {
      setError('Nao foi possivel cadastrar agora. Confira os dados e tente novamente.');
    }
  }

  return (
    <MobileLayout>
      <div className="mobile-content">
        <div className="brand"><h1>Cadastro</h1><p>Escolha como voce quer usar o FavelaFood</p></div>
        <div className="grid">
          {tipos.map((item) => (
            <button key={item.tipo} className={tipo === item.tipo ? 'card chip active' : 'card chip'} onClick={() => setTipo(item.tipo)} type="button">
              <strong>{item.icon}</strong> {item.label}
            </button>
          ))}
        </div>
        <form className="form" onSubmit={submit}>
          <ErrorMessage message={error} />
          <label className="field">Nome<input className="input" value={form.nome} onChange={(e) => change('nome', e.target.value)} required /></label>
          <label className="field">Email<input className="input" type="email" value={form.email} onChange={(e) => change('email', e.target.value)} required /></label>
          <label className="field">Senha<input className="input" type="password" value={form.senha} onChange={(e) => change('senha', e.target.value)} required /></label>
          {tipo === 'CONSUMIDOR' && <label className="field">CPF<input className="input" value={form.cpf} onChange={(e) => change('cpf', maskCpf(e.target.value))} placeholder="000.000.000-00" /></label>}
          {tipo === 'ESTABELECIMENTO' && <label className="field">CNPJ<input className="input" value={form.cnpj} onChange={(e) => change('cnpj', maskCnpj(e.target.value))} placeholder="00.000.000/0000-00" /></label>}
          {tipo === 'ENTREGADOR' && (
            <>
              <label className="field">Veiculo<select className="select" value={form.veiculo} onChange={(e) => change('veiculo', e.target.value)}><option>BICICLETA</option><option>MOTO</option></select></label>
              {form.veiculo === 'MOTO' && <label className="field">CNH<input className="input" value={form.cnh} onChange={(e) => change('cnh', e.target.value)} /></label>}
              <label className="field">Data de nascimento<input className="input" type="date" value={form.data_nascimento} onChange={(e) => change('data_nascimento', e.target.value)} /></label>
            </>
          )}
          <button className="btn" type="submit">Criar conta</button>
        </form>
        <Link className="link-button" to="/login">Ja tenho conta</Link>
      </div>
    </MobileLayout>
  );
}
