import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import StarRating from '../../components/StarRating';
import MobileLayout from '../../layouts/MobileLayout';
import { pedidoApi } from '../../api/pedidoApi';
import { produtoApi } from '../../api/produtoApi';
import { consumidorNav } from './nav';

export default function Avaliacao() {
  const { id } = useParams();
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const pedido = (await pedidoApi.buscar(id)).data;
      await Promise.all((pedido.itens || []).map((item) => produtoApi.avaliar(item.produto_id, {
        fk_pedido_id: Number(id),
        nota,
        comentario,
      })));
      navigate('/consumidor/historico');
    } catch {
      setError('Nao foi possivel enviar a avaliacao.');
    }
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Avaliar pedido</h2>
      <form className="form" onSubmit={submit}>
        <ErrorMessage message={error} />
        <StarRating value={nota} onChange={setNota} />
        <label className="field">Comentario<textarea className="textarea" value={comentario} onChange={(e) => setComentario(e.target.value)} required /></label>
        <button className="btn">Enviar avaliacao</button>
      </form>
    </MobileLayout>
  );
}
