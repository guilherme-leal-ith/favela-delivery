package com.ggl.backend.service;

import com.ggl.backend.dto.EnderecoRequestDTO;
import com.ggl.backend.dto.EnderecoResponseDTO;
import com.ggl.backend.entity.Consumidor;
import com.ggl.backend.entity.Endereco;
import com.ggl.backend.repository.ConsumidorRepository;
import com.ggl.backend.repository.EnderecoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;
    private final ConsumidorRepository consumidorRepository;

    public EnderecoService(EnderecoRepository enderecoRepository, ConsumidorRepository consumidorRepository) {
        this.enderecoRepository = enderecoRepository;
        this.consumidorRepository = consumidorRepository;
    }

    public EnderecoResponseDTO criar(EnderecoRequestDTO dto) {
        if (dto.pontoReferencia() == null || dto.pontoReferencia().isBlank()) {
            throw new RuntimeException("Ponto de referência é obrigatório");
        }
        Consumidor consumidor = consumidorRepository.findById(dto.consumidorId())
                .orElseThrow(() -> new RuntimeException("Consumidor não encontrado"));
        Endereco endereco = new Endereco();
        endereco.setConsumidor(consumidor);
        endereco.setLogradouro(dto.logradouro());
        endereco.setNumero(dto.numero());
        endereco.setPontoReferencia(dto.pontoReferencia());
        return toResponse(enderecoRepository.save(endereco));
    }

    public List<EnderecoResponseDTO> listarPorConsumidor(Integer consumidorId) {
        return enderecoRepository.findByConsumidorId(consumidorId).stream()
                .map(this::toResponse)
                .toList();
    }

    public EnderecoResponseDTO atualizar(Integer id, EnderecoRequestDTO dto) {
        Endereco endereco = enderecoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        if (dto.logradouro() != null) {
            endereco.setLogradouro(dto.logradouro());
        }
        if (dto.numero() != null) {
            endereco.setNumero(dto.numero());
        }
        if (dto.pontoReferencia() != null) {
            if (dto.pontoReferencia().isBlank()) {
                throw new RuntimeException("Ponto de referência é obrigatório");
            }
            endereco.setPontoReferencia(dto.pontoReferencia());
        }
        return toResponse(enderecoRepository.save(endereco));
    }

    public void deletar(Integer id) {
        enderecoRepository.deleteById(id);
    }

    private EnderecoResponseDTO toResponse(Endereco endereco) {
        return new EnderecoResponseDTO(
                endereco.getId(),
                endereco.getLogradouro(),
                endereco.getNumero(),
                endereco.getPontoReferencia()
        );
    }
}
