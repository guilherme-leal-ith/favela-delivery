package com.ggl.backend.service;

import com.ggl.backend.dto.EstabelecimentoResponseDTO;
import com.ggl.backend.dto.MetricasResponseDTO;
import com.ggl.backend.entity.Estabelecimento;
import com.ggl.backend.mapper.EstabelecimentoMapper;
import com.ggl.backend.repository.ConsumidorRepository;
import com.ggl.backend.repository.EntregadorRepository;
import com.ggl.backend.repository.EstabelecimentoRepository;
import com.ggl.backend.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final EstabelecimentoRepository estabelecimentoRepository;
    private final ConsumidorRepository consumidorRepository;
    private final EntregadorRepository entregadorRepository;
    private final PedidoRepository pedidoRepository;

    public AdminService(
            EstabelecimentoRepository estabelecimentoRepository,
            ConsumidorRepository consumidorRepository,
            EntregadorRepository entregadorRepository,
            PedidoRepository pedidoRepository
    ) {
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.consumidorRepository = consumidorRepository;
        this.entregadorRepository = entregadorRepository;
        this.pedidoRepository = pedidoRepository;
    }

    public List<EstabelecimentoResponseDTO> estabelecimentosPendentes() {
        return estabelecimentoRepository.findAll().stream()
                .map(EstabelecimentoMapper::toResponseDTO)
                .toList();
    }

    public EstabelecimentoResponseDTO alterarFuncionamento(Integer id, boolean aberto) {
        Estabelecimento estabelecimento = estabelecimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado"));
        estabelecimento.setAberto(aberto);
        return EstabelecimentoMapper.toResponseDTO(estabelecimentoRepository.save(estabelecimento));
    }

    public MetricasResponseDTO metricas() {
        LocalDate hoje = LocalDate.now();
        LocalDateTime inicio = hoje.atStartOfDay();
        LocalDateTime fim = hoje.plusDays(1).atStartOfDay();
        return new MetricasResponseDTO(
                consumidorRepository.count(),
                entregadorRepository.count(),
                estabelecimentoRepository.count(),
                pedidoRepository.countByDataHoraBetween(inicio, fim),
                List.of(
                        Map.of("dia", "Seg", "pedidos", 8),
                        Map.of("dia", "Ter", "pedidos", 5),
                        Map.of("dia", "Qua", "pedidos", 12),
                        Map.of("dia", "Qui", "pedidos", 7),
                        Map.of("dia", "Sex", "pedidos", 15),
                        Map.of("dia", "Sab", "pedidos", 20),
                        Map.of("dia", "Dom", "pedidos", 18)
                )
        );
    }
}
