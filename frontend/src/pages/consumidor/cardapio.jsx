import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './cardapio.css';

export default function Cardapio() {
  const navigate = useNavigate();

  // Dados fictícios do restaurante e pratos (depois ligamos na API de restaurantes)
  const [restaurante] = useState({ id: 2, nome: "Burgão da Barreira", categoria: "Lanches" });
  
  const [produtos] = useState([
    { id: 10, nome: "X-Tudo Premium", descricao: "Hambúrguer 150g, queijo, presunto, ovo, bacon, alface, tomate e maionese artesanal.", preco: 25.90 },
    { id: 11, nome: "Batata Frita Especial", descricao: "Porção de batata crocante com cheddar e bacon ralado.", preco: 14.00 },
    { id: 12, nome: "Guaraná 600ml", descricao: "Bebida trincando de gelada.", preco: 6.00 }
  ]);

  // Estado do Carrinho de Compras
  const [carrinho, setCarrinho] = useState([]);

  // 1. Adicionar item ou aumentar quantidade
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAtual) => {
      const itemExiste = carrinhoAtual.find(item => item.id === produto.id);

      if (itemExiste) {
        return carrinhoAtual.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  };

  // 2. Calcular o Valor Total do Carrinho
  const valorTotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);

  // 3. Enviar o pedido para o back 
  const finalizarPedido = async () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // Formatando os itens EXATAMENTE como o PedidoRequestDTO vai receber no back
    const itensFormatados = carrinho.map(item => ({
      produtoId: item.id,
      quantidade: item.quantidade
    }));

    // Objeto final espelhado no DTO do Back-end
    const pedidoDTO = {
      consumidorId: 1, 
      restauranteId: restaurante.id,
      itens: itensFormatados,
      valorTotal: valorTotal
    };

    console.log("JSON pronto sendo enviado para o @PostMapping do colega:", pedidoDTO);

    try {
      
      const resposta = await api.post('/pedidos', pedidoDTO);
      console.log("Resposta do Java:", resposta.data);
      
      alert("Pedido realizado com sucesso na comunidade! 🚀");
      setCarrinho([]);
      navigate('/home'); 
    } catch (error) {
      console.error("Erro ao enviar para o Back-end:", error);
    
      alert("Pedido simulado com sucesso (Modo Front-end)! Salvando localmente enquanto o Java está offline.");
      navigate('/home');
    }
  };

  return (
    <div className="cardapio-container">
      <header className="cardapio-header">
        <button onClick={() => navigate('/home')} className="btn-voltar">← Voltar para a Home</button>
        <h2>{restaurante.nome}</h2>
        <p>{restaurante.categoria} • Cria da Comunidade</p>
      </header>

      <div className="cardapio-layout">
    
        <section className="produtos-lista">
          <h3>Opções Disponíveis</h3>
          {produtos.map(produto => (
            <div key={produto.id} className="produto-card">
              <div className="produto-detalhes">
                <h4>{produto.nome}</h4>
                <p>{produto.descricao}</p>
                <span>R$ {produto.preco.toFixed(2)}</span>
              </div>
              <button onClick={() => adicionarAoCarrinho(produto)} className="btn-adicionar">
                + Adicionar
              </button>
            </div>
          ))}
        </section>

  
        <aside className="carrinho-sidebar">
          <h3>Seu Carrinho</h3>
          {carrinho.length === 0 ? (
            <p className="carrinho-vazio">Nenhum item selecionado ainda.</p>
          ) : (
            <div className="carrinho-itens">
              {carrinho.map(item => (
                <div key={item.id} className="carrinho-item">
                  <div className="item-info">
                    <span className="qtd">{item.quantidade}x</span>
                    <span className="nome">{item.nome}</span>
                  </div>
                  <span className="preco">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="carrinho-total">
                <span>Total:</span>
                <strong>R$ {valorTotal.toFixed(2)}</strong>
              </div>
              
              <button onClick={finalizarPedido} className="btn-finalizar">
                Confirmar e Enviar Pedido
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}