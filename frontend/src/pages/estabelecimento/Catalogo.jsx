import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { produtosMock } from '../../mocks/data';
import { estabelecimentoNav } from './nav';

export default function Catalogo() {
  const [produtos, setProdutos] = useState(produtosMock[9]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '' });
  const [editing, setEditing] = useState(null);

  function submit(event) {
    event.preventDefault();
    // TODO: conectar endpoint de produtos.
    const produto = { id: editing || Date.now(), nome: form.nome, descricao: form.descricao, preco: Number(form.preco) };
    setProdutos(editing ? produtos.map((item) => item.id === editing ? produto : item) : [...produtos, produto]);
    setEditing(null);
    setForm({ nome: '', descricao: '', preco: '' });
  }

  function edit(produto) {
    setEditing(produto.id);
    setForm({ nome: produto.nome, descricao: produto.descricao, preco: produto.preco });
  }

  return (
    <DashboardLayout title="Catalogo de produtos" navItems={estabelecimentoNav}>
      <form className="form panel" onSubmit={submit}>
        <div className="grid grid-3">
          <input className="input" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          <input className="input" placeholder="Descricao" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} required />
          <input className="input" placeholder="Preco" type="number" step="0.01" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} required />
        </div>
        <button className="btn">{editing ? 'Salvar produto' : 'Adicionar Produto'}</button>
      </form>
      <div className="list">
        {produtos.map((produto) => (
          <div className="card row" key={produto.id}>
            <div><strong>{produto.nome}</strong><p className="muted">{produto.descricao}</p><strong>R$ {produto.preco.toFixed(2)}</strong></div>
            <div className="row"><button className="btn ghost small" onClick={() => edit(produto)}>Editar</button><button className="btn neutral small" onClick={() => setProdutos(produtos.filter((item) => item.id !== produto.id))}>Remover</button></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
