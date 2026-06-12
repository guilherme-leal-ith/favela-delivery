package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ggl.backend.entity.enums.VeiculoEnum;

import java.time.LocalDate;

public record EntregadorResponseDTO(
    Integer id,
    VeiculoEnum veiculo,
    String cnh,
    @JsonProperty("data_nascimento")
    LocalDate dataNascimento,
    @JsonProperty("is_disponivel")
    Boolean isDisponivel
) {
}
