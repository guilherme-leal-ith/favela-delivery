package com.ggl.backend.service;

import com.ggl.backend.dto.EntregadorRequestDTO;
import com.ggl.backend.dto.EntregadorResponseDTO;
import com.ggl.backend.entity.Entregador;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.entity.enums.TipoUsuarioEnum;
import com.ggl.backend.entity.enums.VeiculoEnum;
import com.ggl.backend.mapper.EntregadorMapper;
import com.ggl.backend.repository.EntregadorRepository;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class EntregadorService {

    private final EntregadorRepository entregadorRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public EntregadorService(EntregadorRepository entregadorRepository, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.entregadorRepository = entregadorRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public EntregadorResponseDTO saveEntregador(EntregadorRequestDTO requestDTO) {
        Usuario usuarioExistente = usuarioRepository.findByEmail(requestDTO.email());

        if (usuarioExistente != null) {
            throw new RuntimeException("E-mail já cadastrado!");
        }
        if (requestDTO.dataNascimento() != null
                && Period.between(requestDTO.dataNascimento(), LocalDate.now()).getYears() < 18) {
            throw new RuntimeException("Entregador deve ter pelo menos 18 anos");
        }
        if (requestDTO.veiculo() == VeiculoEnum.MOTO
                && (requestDTO.cnh() == null || requestDTO.cnh().isBlank())) {
            throw new RuntimeException("CNH é obrigatória para moto");
        }

        Entregador novoEntregador = EntregadorMapper.toEntity(requestDTO);
        novoEntregador.setSenha(passwordEncoder.encode(requestDTO.senha()));
        novoEntregador.setTipoUsuario(TipoUsuarioEnum.ENTREGADOR);
        Entregador entregadorSalvo = entregadorRepository.save(novoEntregador);
        return EntregadorMapper.toResponseDTO(entregadorSalvo);
    }

    public EntregadorResponseDTO findById(Integer id){
        Entregador entregador = entregadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entregador não encontrado com o ID: " + id));

        return EntregadorMapper.toResponseDTO(entregador);
    }

    public EntregadorResponseDTO update(Integer id, EntregadorRequestDTO requestDTO) {
        Entregador entregador = entregadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entregador não encontrado com o ID: " + id));

        if (requestDTO.nome() != null) {
            entregador.setNome(requestDTO.nome());
        }
        if (requestDTO.email() != null) {
            entregador.setEmail(requestDTO.email());
        }
        if (requestDTO.senha() != null && !requestDTO.senha().isBlank()) {
            entregador.setSenha(passwordEncoder.encode(requestDTO.senha()));
        }
        if (requestDTO.veiculo() != null) {
            entregador.setVeiculoEnum(requestDTO.veiculo());
        }
        if (requestDTO.cnh() != null) {
            entregador.setCnh(requestDTO.cnh());
        }
        if (requestDTO.dataNascimento() != null) {
            entregador.setDataNasicmento(requestDTO.dataNascimento());
        }
        if (requestDTO.isDisponivel() != null) {
            entregador.setDisponivel(requestDTO.isDisponivel());
        }

        return EntregadorMapper.toResponseDTO(entregadorRepository.save(entregador));
    }

    public void delete(Integer id) {
        entregadorRepository.deleteById(id);
    }
}
