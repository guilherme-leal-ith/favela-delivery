package com.ggl.backend.service;

import com.ggl.backend.dto.*;
import com.ggl.backend.entity.Estabelecimento;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.entity.enums.TipoUsuarioEnum;
import com.ggl.backend.mapper.EstabelecimentoMapper;
import com.ggl.backend.repository.EstabelecimentoRepository;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstabelecimentoService {

    private final EstabelecimentoRepository estabelecimentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public EstabelecimentoService(EstabelecimentoRepository estabelecimentoRepository, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public EstabelecimentoResponseDTO saveEstabelecimento(EstabelecimentoRequestDTO requestDTO) {
        Usuario usuarioExistente = usuarioRepository.findByEmail(requestDTO.email());

        if (usuarioExistente != null) {
            throw new RuntimeException("E-mail já cadastrado!");
        }

        Estabelecimento novoEstabelecimento = EstabelecimentoMapper.toEntity(requestDTO);
        novoEstabelecimento.setSenha(passwordEncoder.encode(requestDTO.senha()));
        novoEstabelecimento.setTipoUsuario(TipoUsuarioEnum.ESTABELECIMENTO);
        Estabelecimento estabelecimentoSalvo = estabelecimentoRepository.save(novoEstabelecimento);
        return EstabelecimentoMapper.toResponseDTO(estabelecimentoSalvo);
    }

    public EstabelecimentoResponseDTO findById(Integer id){
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado com o ID: " + id));

        return EstabelecimentoMapper.toResponseDTO(estabelecimento);
    }

    public List<EstabelecimentoResponseDTO> listarTodos() {
        return estabelecimentoRepository.findAll().stream()
                .map(EstabelecimentoMapper::toResponseDTO)
                .toList();
    }

    public EstabelecimentoResponseDTO atualizarFuncionamento(Integer id, Boolean aberto) {
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado com o ID: " + id));
        estabelecimento.setAberto(aberto != null ? aberto : false);
        return EstabelecimentoMapper.toResponseDTO(estabelecimentoRepository.save(estabelecimento));
    }

    public EstabelecimentoResponseDTO update(Integer id, EstabelecimentoRequestDTO requestDTO) {
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado com o ID: " + id));

        if (requestDTO.nome() != null) {
            estabelecimento.setNome(requestDTO.nome());
        }
        if (requestDTO.email() != null) {
            estabelecimento.setEmail(requestDTO.email());
        }
        if (requestDTO.senha() != null && !requestDTO.senha().isBlank()) {
            estabelecimento.setSenha(passwordEncoder.encode(requestDTO.senha()));
        }
        if (requestDTO.cnpj() != null) {
            estabelecimento.setCnpj(requestDTO.cnpj());
        }
        if (requestDTO.isAberto() != null) {
            estabelecimento.setAberto(requestDTO.isAberto());
        }

        return EstabelecimentoMapper.toResponseDTO(estabelecimentoRepository.save(estabelecimento));
    }

    public void delete(Integer id) {
        estabelecimentoRepository.deleteById(id);
    }
}
