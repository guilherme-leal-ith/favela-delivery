import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import { estabelecimentosMock, produtosMock } from '../../mocks/data';
import { consumidorNav } from './nav';

export default function Estabelecimento() {
  const { id } = useParams();
  const loja = estabelecimentosMock.find((item) => String(item.id) === id);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('favelafood:cart') || '[]'));
  const produtos = produtosMock[id] || [];
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0), [cart]);

  function add(produto) {
    const next = cart.some((item) => item.id === produto.id)
      ? cart.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)
      : [...cart, { ...produto, quantidade: 1, estabelecimentoId: Number(id), estabelecimento: loja.nome }];
    setCart(next);
    localStorage.setItem('favelafood:cart', JSON.stringify(next));
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <div className="row">
        <div><h2>{loja?.nome}</h2><span className={loja?.isAberto ? 'badge open' : 'badge closed'}>{loja?.isAberto ? 'Aberto' : 'Fechado'}</span></div>
        <Link className="btn ghost small" to="/consumidor/home">Voltar</Link>
      </div>
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
