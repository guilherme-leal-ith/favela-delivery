package com.ggl.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ConsumidorRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        String email,
        String senha,

        @NotBlank(message = "O CPF é obrigatório")
        String cpf
) {
}
