package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public record ItemPedidoResponseDTO(
        @JsonProperty("produto_id")
        String produtoId,
        String nome,
        Integer quantidade,
        @JsonProperty("preco_unitario")
        BigDecimal precoUnitario
) {
}
