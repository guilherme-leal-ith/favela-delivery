import React, { useState, useEffect } from 'react';
import './home-consumidor.css';
import { useNavigate } from 'react-router-dom';


export default function HomeConsumidor() {
      const navigate = useNavigate();
    
  // 1. Dados dos restaurantes provisório
  const [restaurantes] = useState([
    { id: 1, nome: "Dona Maria Quentinhas", categoria: "Brasileira", avaliacao: 4.9, tempo: "25-35 min", imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { id: 2, nome: "Burgão da Barreira", categoria: "Lanches", avaliacao: 4.8, tempo: "15-25 min", imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 3, nome: "Pizzaria do Complexo", categoria: "Pizza", avaliacao: 4.7, tempo: "30-45 min", imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" }
  ]);

  // 2. Estado para guardar os pedidos vindos do Back-end
  const [pedidos, setPedidos] = useState([]);
  const [usuario] = useState({ nome: "Rodrigo" }); // Simulação de usuário logado

  // 3. Efeito para buscar os pedidos do Back-end assim que a tela carregar
  useEffect(() => {
    // Quando o Back-end estiver rodando com o CORS liberado, descomente as linhas abaixo:
    /*
    fetch('http://localhost:8080/pedidos')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(err => console.error("Erro ao buscar pedidos:", err));
    */

    // Dados fictícios simulando o que o PedidoResponseDTO  vai devolver
    // para a tela não ficar vazia enquanto o Java não roda
    setPedidos([
      { id: 101, restauranteNome: "Burgão da Barreira", valorTotal: 34.90, status: "A CAMINHO", data: "Hoje" },
      { id: 102, restauranteNome: "Dona Maria Quentinhas", valorTotal: 22.00, status: "ENTREGUE", data: "Ontem" }
    ]);
  }, []);

  return (
    <div className="home-container">
      {/* Barra de Topo */}
      <header className="home-header">
        <div className="header-content">
          <h1 className="brand-logo">FavelaFood</h1>
          <div className="user-profile">
            <span>Olá, <strong>{usuario.nome}</strong></span>
            <div className="avatar">{usuario.nome[0]}</div>
          </div>
        </div>
      </header>

 
      <section className="hero-banner">
        <div className="banner-text">
          <h2>Os melhores sabores da comunidade</h2>
          <p>Entrega rápida, preço justo e fortalecendo o comércio local.</p>
        </div>
      </section>

      <section className="pedidos-section">
        <h3>Acompanhar Pedidos</h3>
        <div className="pedidos-lista">
          {pedidos.length === 0 ? (
            <p className="sem-pedidos">Nenhum pedido em andamento.</p>
          ) : (
            pedidos.map((pedido) => (
              <div key={pedido.id} className="pedido-mini-card">
                <div className="pedido-mini-info">
                  <h4>{pedido.restauranteNome}</h4>
                  <p>Pedido #{pedido.id} • R$ {pedido.valorTotal.toFixed(2)}</p>
                </div>
                <span className={`status-badge ${pedido.status.toLowerCase().replace(" ", "-")}`}>
                  {pedido.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      
      <section className="categories-section">
        <h3>Categorias</h3>
        <div className="categories-list">
          <div className="category-item active">Todos</div>
          <div className="category-item">Lanches</div>
          <div className="category-item">Quentinhas</div>
          <div className="category-item">Pizzas</div>
        </div>
      </section>


      <section className="stores-section">
        <h3>Restaurantes Próximos</h3>
        <div className="stores-grid">
          {restaurantes.map((loja) => (
            <div key={loja.id} className="store-card" onClick={() => navigate('/cardapio')}>
              <img src={loja.imagem} alt={loja.nome} className="store-img" />
              <div className="store-info">
                <h4>{loja.nome}</h4>
                <p className="store-meta">{loja.categoria} • <span>⭐ {loja.avaliacao}</span></p>
                <p className="store-delivery">{loja.tempo} • Frete Grátis</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}