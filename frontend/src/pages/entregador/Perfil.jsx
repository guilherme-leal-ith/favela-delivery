import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { entregadorApi } from '../../api/entregadorApi';
import { useAuth } from '../../context/AuthContext';
import { entregadorNav } from './nav';

export default function Perfil() {
  const { user, logout } = useAuth();
  const [disponivel, setDisponivel] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function toggle() {
    const next = !disponivel;
    setDisponivel(next);
    try {
      await entregadorApi.editar(user.id, { is_disponivel: next });
    } catch {
      setError('Nao foi possivel atualizar disponibilidade.');
    }
  }

  return (
    <MobileLayout navItems={entregadorNav}>
      <div className="panel"><h2>{user.nome}</h2><p className="muted">{user.email}</p><p>Veiculo: MOTO</p></div>
      <ErrorMessage message={error} />
      <button className={disponivel ? 'toggle on' : 'toggle'} onClick={toggle}>{disponivel ? 'Disponivel' : 'Indisponivel'}</button>
      <button className="btn neutral" onClick={() => { logout(); navigate('/login'); }}>Sair</button>
    </MobileLayout>
  );
}
