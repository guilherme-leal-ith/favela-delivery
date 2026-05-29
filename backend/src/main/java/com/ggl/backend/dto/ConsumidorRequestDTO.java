package com.ggl.backend.dto;

import br.com.caelum.stella.bean.validation.CPF;
import jakarta.validation.constraints.NotBlank;

public record ConsumidorRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        String email,
        String senha,

        @NotBlank(message = "O CPF é obrigatório")
        @CPF(message = "O CPF informado deve ser válido") // <--- A mágica acontece aqui!
        String cpf
) {
}