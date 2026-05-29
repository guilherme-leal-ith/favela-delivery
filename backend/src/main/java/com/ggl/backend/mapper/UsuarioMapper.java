package com.ggl.backend.mapper;

import com.ggl.backend.dto.UsuarioRequestDTO;
import com.ggl.backend.dto.UsuarioResponseDTO;
import com.ggl.backend.entity.Usuario;

public class UsuarioMapper {

    public static Usuario toEntity(UsuarioRequestDTO dto, String senhaHash) {

        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(senhaHash);
        usuario.setTipoUsuario(dto.tipoUsuario());

        return usuario;
    }

    public static UsuarioResponseDTO toResponseDTO(Usuario usuario) {

        UsuarioResponseDTO responseDTO = new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail()
        );

        return responseDTO;
    }
}
