/*package com.ggl.backend.service;

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


}
*/
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
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO findByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return null;
        }
        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO saveUsuario(UsuarioRequestDTO requestDTO) {
        if (findByEmail(requestDTO.email()) != null) {
            throw new RuntimeException("Email ja cadastrado");
        }

        String senhaHash = passwordEncoder.encode(requestDTO.senha());
        Usuario novoUsuario = UsuarioMapper.toEntity(requestDTO, senhaHash);
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        return UsuarioMapper.toResponseDTO(usuarioSalvo);
    }

    public UsuarioResponseDTO efetuarLogin(String email, String senhaDigitada) {
        // 1. Busca o usuário completo direto do banco
        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            throw new RuntimeException("E-mail ou senha inválidos");
        }

        if (!passwordEncoder.matches(senhaDigitada, usuario.getSenha())) {
            throw new RuntimeException("E-mail ou senha inválidos");
        }

        return UsuarioMapper.toResponseDTO(usuario);
    }
}