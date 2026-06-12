package com.ggl.backend.dto;

public record LoginRequestDTO(
        String email,
        String senha
) {
}
