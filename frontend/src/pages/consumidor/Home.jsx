import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import { useAuth } from '../../context/AuthContext';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { estabelecimentoApi } from '../../api/estabelecimentoApi';
import { produtoApi } from '../../api/produtoApi';
import { consumidorNav } from './nav';

const nomesDemo = {
  9: 'Burguer Palace',
  10: 'Pizza Express',
  11: 'Sushi House',
};

function categoriaDemo(id) {
  return { 9: 'Lanches', 10: 'Pizza', 11: 'Japonês' }[id] || 'Geral';
}

export default function Home() {
  const { user } = useAuth();
  const [categoria, setCategoria] = useState('Todos');
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const categorias = useMemo(() => ['Todos', ...new Set(lojas.map((loja) => loja.categoria || 'Geral'))], [lojas]);
  const filtradas = categoria === 'Todos' ? lojas : lojas.filter((loja) => loja.categoria === categoria);

  useEffect(() => {
    async function load() {
      try {
        const response = await estabelecimentoApi.listar();
        if (response.data.length) {
          setLojas(response.data);
        } else {
          const produtosResponse = await produtoApi.listar();
          const ids = [...new Set(produtosResponse.data.map((produto) => produto.fk_estabelecimento_id))];
          setLojas(ids.map((lojaId) => ({
            id: lojaId,
            nome: nomesDemo[lojaId] || `Estabelecimento ${lojaId}`,
            categoria: categoriaDemo(lojaId),
            nota: 0,
            isAberto: true,
          })));
        }
      } catch {
        try {
          const produtosResponse = await produtoApi.listar();
          const ids = [...new Set(produtosResponse.data.map((produto) => produto.fk_estabelecimento_id))];
          setLojas(ids.map((lojaId) => ({
            id: lojaId,
            nome: nomesDemo[lojaId] || `Estabelecimento ${lojaId}`,
            categoria: categoriaDemo(lojaId),
            nota: 0,
            isAberto: true,
          })));
        } catch {
          setError('Nao foi possivel carregar os estabelecimentos.');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Oi, {user?.nome}</h2>
      <p className="muted">Comercios locais perto de voce</p>
      <ErrorMessage message={error} />
      <div className="chips">
        {categorias.map((item) => <button key={item} className={categoria === item ? 'chip active' : 'chip'} onClick={() => setCategoria(item)}>{item}</button>)}
      </div>
      {loading && <LoadingSpinner />}
      <div className="list">
        {filtradas.map((loja) => (
          <Link className="card" key={loja.id} to={`/consumidor/estabelecimento/${loja.id}`}>
            <div className="row"><h3 className="title">{loja.nome}</h3><span className={loja.isAberto ? 'badge open' : 'badge closed'}>{loja.isAberto ? 'Aberto' : 'Fechado'}</span></div>
            <p className="muted">{loja.categoria}</p>
            <strong>★ {Number(loja.nota || 0).toFixed(1)}</strong>
          </Link>
        ))}
      </div>
    </MobileLayout>
  );
}
