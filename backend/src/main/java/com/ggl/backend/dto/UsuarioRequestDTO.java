package com.ggl.backend.dto;

import com.ggl.backend.entity.TipoUsuarioEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// Tudo que o usuario pode vir a mandar
public record UsuarioRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotBlank(message = "O email é obrigatório")
        @Email(message = "Formato de email inválido")
        String email,

        @NotBlank(message = "A senha deve ser obrigatória")
        @Size(min = 6,message = "A senha deve ter no mínimo 6 caracteres")
        String senha,

        @NotNull(message = "O tipo de utilizador deve ser especificado")
        TipoUsuarioEnum tipoUsuario
) {
}
