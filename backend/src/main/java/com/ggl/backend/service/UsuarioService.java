package com.ggl.backend.service;

import com.ggl.backend.dto.UsuarioRequestDTO;
import com.ggl.backend.dto.UsuarioResponseDTO;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.mapper.UsuarioMapper;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO findByEmail(String email) {

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return null; // Se não encontrar o usuário, retorna nulo com segurança em vez de quebrar
        }
        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO findById(Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return UsuarioMapper.toResponseDTO(usuario);
    }

    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioMapper::toResponseDTO)
                .toList();
    }

    public UsuarioResponseDTO saveUsuario(UsuarioRequestDTO requestDTO) {

        Usuario usuarioExistente = usuarioRepository.findByEmail(requestDTO.email());

        if (findByEmail(requestDTO.email()) != null) {
            throw new RuntimeException("Email ja cadastrado");
        }


      String senhaHash = passwordEncoder.encode(requestDTO.senha());
      Usuario novoUsuario = UsuarioMapper.toEntity(requestDTO, senhaHash);
      Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

      return UsuarioMapper.toResponseDTO(usuarioSalvo);
    }

    public UsuarioResponseDTO atualizar(Integer id, UsuarioRequestDTO requestDTO) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (requestDTO.nome() != null) {
            usuario.setNome(requestDTO.nome());
        }
        if (requestDTO.email() != null) {
            usuario.setEmail(requestDTO.email());
        }
        if (requestDTO.senha() != null && !requestDTO.senha().isBlank()) {
            usuario.setSenha(passwordEncoder.encode(requestDTO.senha()));
        }
        if (requestDTO.tipoUsuario() != null) {
            usuario.setTipoUsuario(requestDTO.tipoUsuario());
        }
        return UsuarioMapper.toResponseDTO(usuarioRepository.save(usuario));
    }

    public void deletar(Integer id) {
        usuarioRepository.deleteById(id);
    }


}
