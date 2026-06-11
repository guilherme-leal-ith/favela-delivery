import { useNavigate } from 'react-router-dom';
import MobileLayout from '../../layouts/MobileLayout';
import { useAuth } from '../../context/AuthContext';
import { consumidorNav } from './nav';

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <MobileLayout navItems={consumidorNav}>
      <div className="row panel"><div className="profile-avatar">{user?.nome?.[0]}</div><div><h2>{user?.nome}</h2><p className="muted">{user?.email}</p></div></div>
      <div className="stack">
        <button className="btn ghost" onClick={() => navigate('/consumidor/enderecos')}>Gerenciar Enderecos</button>
        <button className="btn neutral" onClick={() => { logout(); navigate('/login'); }}>Sair</button>
      </div>
    </MobileLayout>
  );
}
