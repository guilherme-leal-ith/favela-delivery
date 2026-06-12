package com.ggl.backend.service;

import com.ggl.backend.dto.LoginRequestDTO;
import com.ggl.backend.dto.LoginResponseDTO;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.email());
        if (usuario == null) {
            throw new RuntimeException("Usuário ou senha inválidos");
        }
        boolean senhaOk = passwordEncoder.matches(dto.senha(), usuario.getSenha())
                || dto.senha().equals(usuario.getSenha());
        if (!senhaOk) {
            throw new RuntimeException("Usuário ou senha inválidos");
        }
        return new LoginResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getTipoUsuario());
    }
}
