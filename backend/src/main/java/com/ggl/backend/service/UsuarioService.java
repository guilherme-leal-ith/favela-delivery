package com.ggl.backend.service;

import com.ggl.backend.dto.UsuarioRequestDTO;
import com.ggl.backend.dto.UsuarioResponseDTO;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.mapper.UsuarioMapper;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    //private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository/*,
                          PasswordEncoder passwordEncoder*/) {
        
        this.usuarioRepository = usuarioRepository;
        //this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO findByEmail(String email) {

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return null; // Se não encontrar o usuário, retorna nulo com segurança em vez de quebrar
        }
        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO saveUsuario(UsuarioRequestDTO requestDTO) {

        if (findByEmail(requestDTO.email()) != null) {
            throw new RuntimeException("Email ja cadastrado");
        }

        //String senhaHash = passwordEncoder.encode(requestDTO.senha());
        String senhaHash = requestDTO.senha();

        Usuario novoUsuario = UsuarioMapper.toEntity(requestDTO, senhaHash);
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        return UsuarioMapper.toResponseDTO(usuarioSalvo);
    }
}
