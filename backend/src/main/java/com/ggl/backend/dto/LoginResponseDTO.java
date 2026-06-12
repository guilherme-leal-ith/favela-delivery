package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ggl.backend.entity.enums.TipoUsuarioEnum;

public record LoginResponseDTO(
        Integer id,
        String nome,
        String email,
        @JsonProperty("tipo_usuario")
        TipoUsuarioEnum tipoUsuario
) {
}
