package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MediaAvaliacaoResponseDTO(
        @JsonProperty("produto_id")
        String produtoId,
        Double media,
        @JsonProperty("total_avaliacoes")
        Integer totalAvaliacoes
) {
}
