package com.ggl.backend.service;

import com.ggl.backend.dto.AvaliacaoProdutoRequestDTO;
import com.ggl.backend.dto.MediaAvaliacaoResponseDTO;
import com.ggl.backend.dto.ProdutoRequestDTO;
import com.ggl.backend.entity.AvaliacaoProduto;
import com.ggl.backend.entity.Produto;
import com.ggl.backend.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto criar(ProdutoRequestDTO dto) {
        validarProduto(dto.nome(), dto.descricao(), dto.preco(), dto.fkEstabelecimentoId());
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setDescricao(dto.descricao());
        produto.setPreco(dto.preco());
        produto.setFkEstabelecimentoId(dto.fkEstabelecimentoId());
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(String id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public List<Produto> listarPorEstabelecimento(Integer estabelecimentoId) {
        return produtoRepository.findByFkEstabelecimentoId(estabelecimentoId);
    }

    public Produto atualizar(String id, ProdutoRequestDTO dto) {
        Produto produto = buscarPorId(id);
        if (dto.nome() != null) {
            produto.setNome(dto.nome());
        }
        if (dto.descricao() != null) {
            produto.setDescricao(dto.descricao());
        }
        if (dto.preco() != null) {
            if (dto.preco().compareTo(BigDecimal.ZERO) <= 0) {
                throw new RuntimeException("Preço deve ser maior que zero");
            }
            produto.setPreco(dto.preco());
        }
        if (dto.fkEstabelecimentoId() != null) {
            produto.setFkEstabelecimentoId(dto.fkEstabelecimentoId());
        }
        return produtoRepository.save(produto);
    }

    public void deletar(String id) {
        Produto produto = buscarPorId(id);
        produtoRepository.delete(produto);
    }

    public AvaliacaoProduto adicionarAvaliacao(String produtoId, AvaliacaoProdutoRequestDTO dto) {
        Produto produto = buscarPorId(produtoId);
        if (dto.fkPedidoId() == null) {
            throw new RuntimeException("Pedido é obrigatório");
        }
        if (dto.nota() == null || dto.nota() < 1 || dto.nota() > 5) {
            throw new RuntimeException("Nota deve ser entre 1 e 5");
        }
        if (dto.comentario() == null || dto.comentario().isBlank()) {
            throw new RuntimeException("Comentário é obrigatório");
        }
        boolean pedidoJaAvaliado = produto.getAvaliacoes().stream()
                .anyMatch(avaliacao -> dto.fkPedidoId().equals(avaliacao.getFkPedidoId()));
        if (pedidoJaAvaliado) {
            throw new RuntimeException("Este pedido já avaliou o produto");
        }

        AvaliacaoProduto avaliacao = new AvaliacaoProduto();
        avaliacao.setFkPedidoId(dto.fkPedidoId());
        avaliacao.setNota(dto.nota());
        avaliacao.setComentario(dto.comentario());
        produto.getAvaliacoes().add(avaliacao);
        produtoRepository.save(produto);
        return avaliacao;
    }

    public List<AvaliacaoProduto> listarAvaliacoes(String produtoId) {
        return buscarPorId(produtoId).getAvaliacoes();
    }

    public MediaAvaliacaoResponseDTO media(String produtoId) {
        List<AvaliacaoProduto> avaliacoes = listarAvaliacoes(produtoId);
        double media = avaliacoes.stream()
                .mapToInt(AvaliacaoProduto::getNota)
                .average()
                .orElse(0);
        return new MediaAvaliacaoResponseDTO(produtoId, media, avaliacoes.size());
    }

    private void validarProduto(String nome, String descricao, BigDecimal preco, Integer estabelecimentoId) {
        if (nome == null || nome.isBlank()) {
            throw new RuntimeException("Nome é obrigatório");
        }
        if (descricao == null || descricao.isBlank()) {
            throw new RuntimeException("Descrição é obrigatória");
        }
        if (preco == null || preco.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Preço deve ser maior que zero");
        }
        if (estabelecimentoId == null) {
            throw new RuntimeException("Estabelecimento é obrigatório");
        }
    }
}
