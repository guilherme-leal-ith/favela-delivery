package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public record EstabelecimentoRequestDTO(
        String nome,
        String senha,
        String email,
        String cnpj,
        @JsonAlias("is_aberto")
        Boolean isAberto
) {
}
