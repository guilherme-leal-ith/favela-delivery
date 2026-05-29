package com.ggl.backend.dto;

public record ConsumidorResponseDTO(
        Integer id,
        String nome,
        String email,
        String cpf
) {
}
