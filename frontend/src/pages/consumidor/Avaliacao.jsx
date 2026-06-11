import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import MobileLayout from '../../layouts/MobileLayout';
import { consumidorNav } from './nav';

export default function Avaliacao() {
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    // TODO: conectar endpoint de avaliacao.
    navigate('/consumidor/historico');
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Avaliar pedido</h2>
      <form className="form" onSubmit={submit}>
        <StarRating value={nota} onChange={setNota} />
        <label className="field">Comentario<textarea className="textarea" value={comentario} onChange={(e) => setComentario(e.target.value)} /></label>
        <button className="btn">Enviar avaliacao</button>
      </form>
    </MobileLayout>
  );
}
