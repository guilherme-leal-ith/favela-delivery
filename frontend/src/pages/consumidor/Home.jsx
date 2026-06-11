import { Link } from 'react-router-dom';
import { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentosMock } from '../../mocks/data';
import { consumidorNav } from './nav';

export default function Home() {
  const { user } = useAuth();
  const [categoria, setCategoria] = useState('Todos');
  const categorias = ['Todos', 'Lanches', 'Pizza', 'Japonês'];
  const lojas = categoria === 'Todos' ? estabelecimentosMock : estabelecimentosMock.filter((loja) => loja.categoria === categoria);

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Oi, {user?.nome}</h2>
      <p className="muted">Comercios locais perto de voce</p>
      <div className="chips">
        {categorias.map((item) => <button key={item} className={categoria === item ? 'chip active' : 'chip'} onClick={() => setCategoria(item)}>{item}</button>)}
      </div>
      <div className="list">
        {lojas.map((loja) => (
          <Link className="card" key={loja.id} to={`/consumidor/estabelecimento/${loja.id}`}>
            <div className="row"><h3 className="title">{loja.nome}</h3><span className={loja.isAberto ? 'badge open' : 'badge closed'}>{loja.isAberto ? 'Aberto' : 'Fechado'}</span></div>
            <p className="muted">{loja.categoria}</p>
            <strong>★ {loja.nota.toFixed(1)}</strong>
          </Link>
        ))}
      </div>
    </MobileLayout>
  );
}
