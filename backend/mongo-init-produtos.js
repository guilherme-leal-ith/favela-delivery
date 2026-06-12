db = db.getSiblingDB("favelafood");

db.createCollection("produtos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome", "descricao", "preco", "fk_estabelecimento_id"],
      properties: {
        nome: { bsonType: "string" },
        descricao: { bsonType: "string" },
        preco: { bsonType: ["double", "int", "decimal"], minimum: 0.01 },
        fk_estabelecimento_id: { bsonType: "int" },
        avaliacoes: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["nota", "comentario", "fk_pedido_id"],
            properties: {
              nota: { bsonType: "int", minimum: 1, maximum: 5 },
              comentario: { bsonType: "string" },
              fk_pedido_id: { bsonType: "int" }
            }
          }
        }
      }
    }
  }
});

db.produtos.createIndex({ nome: 1 });
db.produtos.createIndex({ fk_estabelecimento_id: 1 });

db.produtos.insertMany([
  { nome: "X-Burguer", descricao: "Hamburguer com queijo e bacon", preco: 27.90, fk_estabelecimento_id: 9, avaliacoes: [
    { nota: 5, comentario: "Perfeito, entrega rapida!", fk_pedido_id: 1 },
    { nota: 3, comentario: "Lanche ok, batata estava morna.", fk_pedido_id: 5 },
    { nota: 4, comentario: "Bom, mas faltou ketchup.", fk_pedido_id: 7 }
  ] },
  { nome: "X-Salada", descricao: "Hamburguer com salada completa", preco: 22.90, fk_estabelecimento_id: 9, avaliacoes: [] },
  { nome: "Batata Frita P", descricao: "Porcao pequena crocante", preco: 9.90, fk_estabelecimento_id: 9, avaliacoes: [] },
  { nome: "Batata Frita G", descricao: "Porcao grande crocante", preco: 16.90, fk_estabelecimento_id: 9, avaliacoes: [] },
  { nome: "Refrigerante", descricao: "Lata 350ml", preco: 6.00, fk_estabelecimento_id: 9, avaliacoes: [] },
  { nome: "Pizza Margherita", descricao: "Molho tomate e mussarela", preco: 39.90, fk_estabelecimento_id: 10, avaliacoes: [
    { nota: 4, comentario: "Pizza boa, demorou um pouco.", fk_pedido_id: 2 }
  ] },
  { nome: "Pizza Calabresa", descricao: "Calabresa com cebola", preco: 42.90, fk_estabelecimento_id: 10, avaliacoes: [] },
  { nome: "Suco Natural", descricao: "Copo 400ml sabores variados", preco: 8.00, fk_estabelecimento_id: 10, avaliacoes: [] },
  { nome: "Combinado 20", descricao: "20 pecas variadas", preco: 49.90, fk_estabelecimento_id: 11, avaliacoes: [
    { nota: 5, comentario: "Sushi fresquinho, amei!", fk_pedido_id: 4 },
    { nota: 5, comentario: "Melhor combinado da cidade!", fk_pedido_id: 6 }
  ] },
  { nome: "Combinado 40", descricao: "40 pecas variadas", preco: 89.90, fk_estabelecimento_id: 11, avaliacoes: [] },
  { nome: "Temaki Salmon", descricao: "Temaki de salmao com cream cheese", preco: 24.90, fk_estabelecimento_id: 11, avaliacoes: [] }
]);
