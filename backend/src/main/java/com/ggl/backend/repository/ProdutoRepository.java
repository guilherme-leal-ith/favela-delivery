package com.ggl.backend.repository;

import com.ggl.backend.entity.Produto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends MongoRepository<Produto, String> {
    List<Produto> findByFkEstabelecimentoId(Integer fkEstabelecimentoId);
    Optional<Produto> findByNome(String nome);
}
