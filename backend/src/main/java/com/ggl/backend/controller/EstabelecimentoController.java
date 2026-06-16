package com.ggl.backend.controller;

import com.ggl.backend.dto.EstabelecimentoRequestDTO;
import com.ggl.backend.dto.EstabelecimentoResponseDTO;
import com.ggl.backend.entity.Produto;
import com.ggl.backend.service.EstabelecimentoService;
import com.ggl.backend.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/estabelecimento", "/api/estabelecimentos"})
@CrossOrigin(origins = "*")
public class EstabelecimentoController {

    private final EstabelecimentoService estabelecimentoService;
    private final ProdutoService produtoService;

    public EstabelecimentoController(EstabelecimentoService estabelecimentoService, ProdutoService produtoService){
        this.estabelecimentoService = estabelecimentoService;
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<EstabelecimentoResponseDTO> create(@Valid @RequestBody EstabelecimentoRequestDTO requestDTO){
        EstabelecimentoResponseDTO novoEstabelecimento = estabelecimentoService.saveEstabelecimento(requestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoEstabelecimento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstabelecimentoResponseDTO> getById(@PathVariable Integer id){
        EstabelecimentoResponseDTO estabelecimento = estabelecimentoService.findById(id);

        return ResponseEntity.ok(estabelecimento);
    }

    @GetMapping
    public ResponseEntity<List<EstabelecimentoResponseDTO>> listarTodos(){
        return ResponseEntity.ok(estabelecimentoService.listarTodos());
    }

    @GetMapping("/{id}/produtos")
    public ResponseEntity<List<Produto>> listarProdutos(@PathVariable Integer id){
        return ResponseEntity.ok(produtoService.listarPorEstabelecimento(id));
    }

    @PutMapping("/{id}/funcionamento")
    public ResponseEntity<EstabelecimentoResponseDTO> atualizarFuncionamento(
            @PathVariable Integer id,
            @RequestBody Map<String, Boolean> body
    ){
        Boolean aberto = body.get("is_aberto");
        if (aberto == null) {
            aberto = body.get("isAberto");
        }
        return ResponseEntity.ok(estabelecimentoService.atualizarFuncionamento(id, aberto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstabelecimentoResponseDTO> update(
            @PathVariable Integer id,
            @RequestBody EstabelecimentoRequestDTO requestDTO
    ){
        return ResponseEntity.ok(estabelecimentoService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        estabelecimentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
