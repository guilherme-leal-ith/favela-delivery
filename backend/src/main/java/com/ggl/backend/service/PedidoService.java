package com.ggl.backend.service;

import com.ggl.backend.dto.PedidoRequestDTO;
import com.ggl.backend.dto.PedidoResponseDTO;
import com.ggl.backend.entity.Consumidor;
import com.ggl.backend.entity.Entregador;
import com.ggl.backend.entity.Estabelecimento;
import com.ggl.backend.entity.Pedido;
import com.ggl.backend.mapper.PedidoMapper;
import com.ggl.backend.repository.ConsumidorRepository;
import com.ggl.backend.repository.EntregadorRepository;
import com.ggl.backend.repository.EstabelecimentoRepository;
import com.ggl.backend.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;
    private final ConsumidorRepository consumidorRepository;
    private final EntregadorRepository entregadorRepository;

    public PedidoService(
            PedidoRepository pedidoRepository,
            EstabelecimentoRepository estabelecimentoRepository,
            ConsumidorRepository consumidorRepository,
            EntregadorRepository entregadorRepository
    ) {
        this.pedidoRepository = pedidoRepository;
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.consumidorRepository = consumidorRepository;
        this.entregadorRepository = entregadorRepository;
    }

    public List<PedidoResponseDTO> listarTodos() {

        return pedidoRepository.findAll()
                .stream()
                .map(PedidoMapper::toResponseDTO)
                .toList();
    }

    public PedidoResponseDTO buscarPorId(Integer id) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        return PedidoMapper.toResponseDTO(pedido);
    }

    public PedidoResponseDTO criar(PedidoRequestDTO dto) {

        Estabelecimento estabelecimento =
                estabelecimentoRepository.findById(dto.estabelecimentoId())
                        .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado"));

        Consumidor consumidor =
                consumidorRepository.findById(dto.consumidorId())
                        .orElseThrow(() -> new RuntimeException("Consumidor não encontrado"));

        Entregador entregador = null;

        if (dto.entregadorId() != null) {
            entregador = entregadorRepository.findById(dto.entregadorId())
                    .orElseThrow(() -> new RuntimeException("Entregador não encontrado"));
        }

        Pedido pedido = PedidoMapper.toEntity(
                dto,
                estabelecimento,
                consumidor,
                entregador
        );

        pedido = pedidoRepository.save(pedido);

        return PedidoMapper.toResponseDTO(pedido);
    }

    public void deletar(Integer id) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedidoRepository.delete(pedido);
    }
}