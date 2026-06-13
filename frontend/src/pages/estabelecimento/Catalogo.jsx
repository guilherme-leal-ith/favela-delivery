import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import DashboardLayout from '../../layouts/DashboardLayout';
import { produtoApi } from '../../api/produtoApi';
import { useAuth } from '../../context/AuthContext';
import { estabelecimentoNav } from './nav';

export default function Catalogo() {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await produtoApi.porEstabelecimento(user.id);
        setProdutos(response.data);
      } catch {
        setError('Nao foi possivel carregar o catalogo.');
      }
    }
    load();
  }, [user.id]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    const body = { nome: form.nome, descricao: form.descricao, preco: Number(form.preco), fk_estabelecimento_id: user.id };
    try {
      const response = editing ? await produtoApi.editar(editing, body) : await produtoApi.criar(body);
      setProdutos(editing ? produtos.map((item) => item.id === editing ? response.data : item) : [...produtos, response.data]);
      setEditing(null);
      setForm({ nome: '', descricao: '', preco: '' });
    } catch {
      setError('Nao foi possivel salvar o produto.');
    }
  }

  function edit(produto) {
    setEditing(produto.id);
    setForm({ nome: produto.nome, descricao: produto.descricao, preco: produto.preco });
  }

  return (
    <DashboardLayout title="Catalogo de produtos" navItems={estabelecimentoNav}>
      <ErrorMessage message={error} />
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
            <div><strong>{produto.nome}</strong><p className="muted">{produto.descricao}</p><strong>R$ {Number(produto.preco || 0).toFixed(2)}</strong></div>
            <div className="row"><button className="btn ghost small" onClick={() => edit(produto)}>Editar</button><button className="btn neutral small" onClick={async () => { await produtoApi.remover(produto.id); setProdutos(produtos.filter((item) => item.id !== produto.id)); }}>Remover</button></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
