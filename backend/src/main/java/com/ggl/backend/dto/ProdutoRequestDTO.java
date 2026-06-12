package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        String nome,
        String descricao,
        BigDecimal preco,
        @JsonAlias("fkEstabelecimentoId")
        @JsonProperty("fk_estabelecimento_id")
        Integer fkEstabelecimentoId
) {
}
