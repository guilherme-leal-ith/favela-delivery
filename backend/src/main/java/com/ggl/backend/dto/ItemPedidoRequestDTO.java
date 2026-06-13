package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public record ItemPedidoRequestDTO(
        @JsonAlias({"produtoId", "produto_id", "id"})
        @JsonProperty("produto_id")
        String produtoId,
        String nome,
        Integer quantidade,
        @JsonAlias({"precoUnitario", "preco"})
        @JsonProperty("preco_unitario")
        BigDecimal precoUnitario
) {
}
