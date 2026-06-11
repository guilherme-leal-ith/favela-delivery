import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { enderecosMock } from '../../mocks/data';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { consumidorNav } from './nav';

export default function Carrinho() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('favelafood:cart') || '[]'));
  const [enderecoId, setEnderecoId] = useState(enderecosMock[0].id);
  const [pagamento, setPagamento] = useState('PIX');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = useMemo(() => items.reduce((sum, item) => sum + item.preco * item.quantidade, 0), [items]);

  function update(id, delta) {
    const next = items.map((item) => item.id === id ? { ...item, quantidade: item.quantidade + delta } : item).filter((item) => item.quantidade > 0);
    setItems(next);
    localStorage.setItem('favelafood:cart', JSON.stringify(next));
  }

  async function criarPedido() {
    setError('');
    if (total < 10) return setError('O valor minimo do pedido e R$ 10,00.');
    try {
      await pedidoApi.criar({ fk_consumidor_id: user.id, itens: items, endereco_id: enderecoId, forma_pagamento: pagamento, valor_total: total, status: 'PENDENTE' });
      localStorage.removeItem('favelafood:cart');
      navigate('/consumidor/pedido');
    } catch {
      setError('Nao foi possivel criar o pedido. Tente novamente.');
    }
  }

  return (
    <MobileLayout navItems={consumidorNav}>
      <h2>Carrinho</h2>
      <ErrorMessage message={error} />
      <div className="list">
        {items.map((item) => (
          <div className="card row" key={item.id}>
            <div><strong>{item.nome}</strong><p className="muted">R$ {item.preco.toFixed(2)}</p></div>
            <div className="row"><button className="btn ghost small" onClick={() => update(item.id, -1)}>-</button><strong>{item.quantidade}</strong><button className="btn ghost small" onClick={() => update(item.id, 1)}>+</button></div>
          </div>
        ))}
      </div>
      <label className="field">Endereco<select className="select" value={enderecoId} onChange={(e) => setEnderecoId(Number(e.target.value))}>{enderecosMock.map((e) => <option key={e.id} value={e.id}>{e.logradouro}, {e.numero || 's/n'} - {e.ponto_referencia}</option>)}</select></label>
      <div className="row">
        <button className={pagamento === 'PIX' ? 'btn success' : 'btn ghost'} onClick={() => setPagamento('PIX')}>PIX</button>
        <button className={pagamento === 'Dinheiro' ? 'btn success' : 'btn ghost'} onClick={() => setPagamento('Dinheiro')}>Dinheiro</button>
      </div>
      <div className="panel row"><strong>Total</strong><strong>R$ {total.toFixed(2)}</strong></div>
      <button className="btn" onClick={criarPedido}>Fazer Pedido</button>
    </MobileLayout>
  );
}
