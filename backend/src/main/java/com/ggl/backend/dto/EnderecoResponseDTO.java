package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EnderecoResponseDTO(
        Integer id,
        String logradouro,
        String numero,
        @JsonProperty("ponto_referencia")
        String pontoReferencia
) {
}
