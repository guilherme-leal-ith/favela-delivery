package com.ggl.backend.dto;

//Tudo que o cliente pode vir a precisar saber
public record UsuarioResponseDTO(
        Integer id,
        String nome,
        String email
) {
}
