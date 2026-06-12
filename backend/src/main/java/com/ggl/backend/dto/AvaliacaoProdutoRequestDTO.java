package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public record AvaliacaoProdutoRequestDTO(
        @JsonAlias("fkPedidoId")
        @JsonProperty("fk_pedido_id")
        Integer fkPedidoId,
        Integer nota,
        String comentario
) {
}
