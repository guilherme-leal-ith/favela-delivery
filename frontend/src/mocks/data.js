export const estabelecimentosMock = [
  { id: 9, nome: 'Burguer Palace', categoria: 'Lanches', nota: 4.2, isAberto: true },
  { id: 10, nome: 'Pizza Express', categoria: 'Pizza', nota: 4.0, isAberto: false },
  { id: 11, nome: 'Sushi House', categoria: 'Japonês', nota: 4.8, isAberto: true },
];

export const produtosMock = {
  9: [
    { id: 1, nome: 'X-Burguer', descricao: 'Hambúrguer com queijo e bacon', preco: 27.9 },
    { id: 2, nome: 'X-Salada', descricao: 'Hambúrguer com salada completa', preco: 22.9 },
    { id: 3, nome: 'Batata Frita P', descricao: 'Porção pequena crocante', preco: 9.9 },
    { id: 4, nome: 'Batata Frita G', descricao: 'Porção grande crocante', preco: 16.9 },
    { id: 5, nome: 'Refrigerante', descricao: 'Lata 350ml', preco: 6.0 },
  ],
  10: [
    { id: 6, nome: 'Pizza Margherita', descricao: 'Molho tomate e mussarela', preco: 39.9 },
    { id: 7, nome: 'Pizza Calabresa', descricao: 'Calabresa com cebola', preco: 42.9 },
    { id: 8, nome: 'Suco Natural', descricao: 'Copo 400ml sabores variados', preco: 8.0 },
  ],
  11: [
    { id: 9, nome: 'Combinado 20', descricao: '20 peças variadas', preco: 49.9 },
    { id: 10, nome: 'Combinado 40', descricao: '40 peças variadas', preco: 89.9 },
    { id: 11, nome: 'Temaki Salmon', descricao: 'Temaki de salmão com cream cheese', preco: 24.9 },
  ],
};

export const pedidosMock = [
  { id: 1, estabelecimento: 'Burguer Palace', status: 'ENTREGUE', valor_total: 57.8, data_hora: '2026-04-20 12:30' },
  { id: 2, estabelecimento: 'Pizza Express', status: 'ENTREGUE', valor_total: 90.8, data_hora: '2026-04-21 19:15' },
  { id: 3, estabelecimento: 'Burguer Palace', status: 'CANCELADO', valor_total: 22.9, data_hora: '2026-04-22 13:00' },
];

export const enderecosMock = [
  { id: 1, logradouro: 'Rua das Flores', numero: '123', ponto_referencia: 'Perto do mercado' },
  { id: 2, logradouro: 'Estrada do Alto', numero: null, ponto_referencia: 'Sítio da entrada' },
];

export const metricasMock = {
  totalConsumidores: 5,
  totalEntregadores: 3,
  totalEstabelecimentos: 3,
  pedidosHoje: 4,
  pedidosPorDia: [
    { dia: 'Seg', pedidos: 8 },
    { dia: 'Ter', pedidos: 5 },
    { dia: 'Qua', pedidos: 12 },
    { dia: 'Qui', pedidos: 7 },
    { dia: 'Sex', pedidos: 15 },
    { dia: 'Sab', pedidos: 20 },
    { dia: 'Dom', pedidos: 18 },
  ],
};

export const pedidosDisponiveisMock = [
  {
    id: 21,
    estabelecimento: 'Burguer Palace',
    endereco: 'Rua das Flores, 123',
    ponto_referencia: 'Portão azul ao lado do mercado',
    valor_total: 57.8,
  },
  {
    id: 22,
    estabelecimento: 'Sushi House',
    endereco: 'Estrada do Alto',
    ponto_referencia: 'Subida depois da quadra',
    valor_total: 89.9,
  },
];
