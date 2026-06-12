package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EstabelecimentoResponseDTO(
        Integer id,
        String nome,
        String categoria,
        Double nota,
        String cnpj,
        @JsonProperty("is_aberto")
        Boolean isAbertoSnake,
        Boolean isAberto
) {
}
