package com.ggl.backend.service;

import com.ggl.backend.dto.ConsumidorRequestDTO;
import com.ggl.backend.dto.ConsumidorResponseDTO;
import com.ggl.backend.dto.EnderecoRequestDTO;
import com.ggl.backend.entity.Consumidor;
import com.ggl.backend.entity.Endereco;
import com.ggl.backend.entity.enums.TipoUsuarioEnum;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.mapper.ConsumidorMapper;
import com.ggl.backend.repository.ConsumidorRepository;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConsumidorService {
    private final ConsumidorRepository consumidorRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public ConsumidorService(ConsumidorRepository consumidorRepository, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder){
        this.consumidorRepository = consumidorRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public ConsumidorResponseDTO saveConsumidor(ConsumidorRequestDTO requestDTO){
        Usuario usuarioExistente = usuarioRepository.findByEmail(requestDTO.email());
        if(usuarioExistente != null){
            throw new RuntimeException("E-mail já cadastrado no sistema");
        }

        String senhaCripto = passwordEncoder.encode(requestDTO.senha());
        Consumidor novoConsumidor = ConsumidorMapper.toEntity(requestDTO, senhaCripto);
        novoConsumidor.setTipoUsuario(TipoUsuarioEnum.CONSUMIDOR);
        Consumidor consumidorSalvo = consumidorRepository.save(novoConsumidor);

        return ConsumidorMapper.toResponseDTO(consumidorSalvo);
    }

    public ConsumidorResponseDTO findById(Integer id){
        Consumidor consumidor = consumidorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consumidor não encontrado com o ID: " + id));

        return ConsumidorMapper.toResponseDTO(consumidor);
    }

    public ConsumidorResponseDTO updateNome(Integer id, String novoNome) {
        Consumidor consumidor = consumidorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consumidor não encontrado com o ID:" + id));
        consumidor.setNome(novoNome);
        Consumidor atualizado = consumidorRepository.save(consumidor);

        return ConsumidorMapper.toResponseDTO(atualizado);
    }

    public void updateSenha(Integer id, String novaSenha){
        Consumidor consumidor = consumidorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consumidor não encontrado com o ID:" + id));

        String senhaCripto = passwordEncoder.encode(novaSenha);
        consumidor.setSenha(senhaCripto);

        consumidorRepository.save(consumidor);
    }

    @Transactional
    public void adicionarEndereco(Integer consumidorId, EnderecoRequestDTO enderecoDTO){
        Consumidor consumidor = consumidorRepository.findById(consumidorId)
                .orElseThrow(() -> new RuntimeException("Consumidor não encontrado com o ID: " + consumidorId));

        Endereco endereco = new Endereco();
        endereco.setLogradouro(enderecoDTO.logradouro());
        endereco.setNumero(enderecoDTO.numero());
        endereco.setPontoReferencia(enderecoDTO.pontoReferencia());

        consumidor.adicionarEndereco(endereco);
        consumidorRepository.save(consumidor);

    }

}
