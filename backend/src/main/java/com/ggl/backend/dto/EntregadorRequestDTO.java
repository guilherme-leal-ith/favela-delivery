package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.ggl.backend.entity.enums.VeiculoEnum;

import java.time.LocalDate;

public record EntregadorRequestDTO(
    String nome,
    String senha,
    String email,
    VeiculoEnum veiculo,
    String cnh,
    @JsonAlias("data_nascimento")
    LocalDate dataNascimento,
    @JsonAlias("is_disponivel")
    Boolean isDisponivel
) {
}
