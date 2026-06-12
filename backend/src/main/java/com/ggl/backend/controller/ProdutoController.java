package com.ggl.backend.controller;

import com.ggl.backend.dto.AvaliacaoProdutoRequestDTO;
import com.ggl.backend.dto.MediaAvaliacaoResponseDTO;
import com.ggl.backend.dto.ProdutoRequestDTO;
import com.ggl.backend.entity.AvaliacaoProduto;
import com.ggl.backend.entity.Produto;
import com.ggl.backend.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto criar(@RequestBody ProdutoRequestDTO dto) {
        return produtoService.criar(dto);
    }

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable String id) {
        return produtoService.buscarPorId(id);
    }

    @GetMapping("/estabelecimento/{id}")
    public List<Produto> listarPorEstabelecimento(@PathVariable Integer id) {
        return produtoService.listarPorEstabelecimento(id);
    }

    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable String id, @RequestBody ProdutoRequestDTO dto) {
        return produtoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable String id) {
        produtoService.deletar(id);
    }

    @PostMapping("/{produtoId}/avaliacoes")
    @ResponseStatus(HttpStatus.CREATED)
    public AvaliacaoProduto adicionarAvaliacao(
            @PathVariable String produtoId,
            @RequestBody AvaliacaoProdutoRequestDTO dto
    ) {
        return produtoService.adicionarAvaliacao(produtoId, dto);
    }

    @GetMapping("/{produtoId}/avaliacoes")
    public List<AvaliacaoProduto> listarAvaliacoes(@PathVariable String produtoId) {
        return produtoService.listarAvaliacoes(produtoId);
    }

    @GetMapping("/{produtoId}/avaliacoes/media")
    public MediaAvaliacaoResponseDTO media(@PathVariable String produtoId) {
        return produtoService.media(produtoId);
    }
}
