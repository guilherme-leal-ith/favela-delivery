package com.ggl.backend.dto;

public record EnderecoRequestDTO(
        String logradouro,
        String numero,
        String pontoReferencia
) {
}
