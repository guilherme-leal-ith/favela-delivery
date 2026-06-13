import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
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

export default function Estabelecimento() {
  const { id } = useParams();
  const [loja, setLoja] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('favelafood:cart') || '[]'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0), [cart]);

  useEffect(() => {
    async function load() {
      try {
        const produtosResponse = await produtoApi.porEstabelecimento(id);
        setProdutos(produtosResponse.data);
        try {
          const lojaResponse = await estabelecimentoApi.buscar(id);
          setLoja(lojaResponse.data);
        } catch {
          setLoja({ id: Number(id), nome: nomesDemo[id] || `Estabelecimento ${id}`, isAberto: true });
        }
      } catch {
        setError('Nao foi possivel carregar o cardapio.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function add(produto) {
    const next = cart.some((item) => item.id === produto.id)
      ? cart.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)
      : [...cart, { ...produto, quantidade: 1, estabelecimentoId: Number(id), estabelecimento: loja?.nome }];
    setCart(next);
    localStorage.setItem('favelafood:cart', JSON.stringify(next));
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <div className="row">
        <div><h2>{loja?.nome}</h2><span className={loja?.isAberto ? 'badge open' : 'badge closed'}>{loja?.isAberto ? 'Aberto' : 'Fechado'}</span></div>
        <Link className="btn ghost small" to="/consumidor/home">Voltar</Link>
      </div>
      <ErrorMessage message={error} />
      {loading && <LoadingSpinner />}
      <div className="list">
        {produtos.map((produto) => (
          <div className="card row" key={produto.id}>
            <div>
              <h3 className="title">{produto.nome}</h3>
              <p className="muted">{produto.descricao}</p>
              <strong>R$ {produto.preco.toFixed(2)}</strong>
            </div>
            <button className="btn small" onClick={() => add(produto)}>+</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <Link className="btn floating-cart row" to="/consumidor/carrinho">
          <span>{cart.reduce((sum, item) => sum + item.quantidade, 0)} itens</span>
          <span>R$ {total.toFixed(2)}</span>
        </Link>
      )}
    </MobileLayout>
  );
}
