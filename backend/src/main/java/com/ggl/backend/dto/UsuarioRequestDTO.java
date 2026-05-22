package com.ggl.backend.dto;

import com.ggl.backend.entity.TipoUsuarioEnum;
// Tudo que o usuario pode vir a mandar
public record UsuarioRequestDTO(
        String nome,
        String email,
        String senha,
        TipoUsuarioEnum tipoUsuario
) {
}
