import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import MobileLayout from '../../layouts/MobileLayout';
import { enderecoApi } from '../../api/enderecoApi';
import { pedidoApi } from '../../api/pedidoApi';
import { useAuth } from '../../context/AuthContext';
import { consumidorNav } from './nav';

export default function Carrinho() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('favelafood:cart') || '[]'));
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoId, setEnderecoId] = useState('');
  const [pagamento, setPagamento] = useState('PIX');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = useMemo(() => items.reduce((sum, item) => sum + item.preco * item.quantidade, 0), [items]);

  useEffect(() => {
    async function load() {
      try {
        const response = await enderecoApi.porConsumidor(user.id);
        setEnderecos(response.data);
        setEnderecoId(response.data[0]?.id || '');
      } catch {
        setError('Cadastre um endereco antes de pedir.');
      }
    }
    load();
  }, [user.id]);

  function update(id, delta) {
    const next = items.map((item) => item.id === id ? { ...item, quantidade: item.quantidade + delta } : item).filter((item) => item.quantidade > 0);
    setItems(next);
    localStorage.setItem('favelafood:cart', JSON.stringify(next));
  }

  async function criarPedido() {
    setError('');
    if (total < 10) return setError('O valor minimo do pedido e R$ 10,00.');
    if (!enderecoId) return setError('Selecione ou cadastre um endereco.');
    try {
      await pedidoApi.criar({
        fk_consumidor_id: user.id,
        fk_estabelecimento_id: items[0]?.estabelecimentoId,
        itens: items.map((item) => ({
          produto_id: item.id,
          nome: item.nome,
          quantidade: item.quantidade,
          preco_unitario: item.preco,
        })),
        endereco_id: Number(enderecoId),
        forma_pagamento: pagamento,
        valor_total: total,
        status: 'PENDENTE',
      });
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
      <label className="field">Endereco<select className="select" value={enderecoId} onChange={(e) => setEnderecoId(e.target.value)}>{enderecos.map((e) => <option key={e.id} value={e.id}>{e.logradouro}, {e.numero || 's/n'} - {e.ponto_referencia}</option>)}</select></label>
      <div className="row">
        <button className={pagamento === 'PIX' ? 'btn success' : 'btn ghost'} onClick={() => setPagamento('PIX')}>PIX</button>
        <button className={pagamento === 'DINHEIRO' ? 'btn success' : 'btn ghost'} onClick={() => setPagamento('DINHEIRO')}>Dinheiro</button>
      </div>
      <div className="panel row"><strong>Total</strong><strong>R$ {total.toFixed(2)}</strong></div>
      <button className="btn" onClick={criarPedido}>Fazer Pedido</button>
    </MobileLayout>
  );
}
