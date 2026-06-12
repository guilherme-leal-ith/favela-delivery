package com.ggl.backend.dto;

import java.util.List;
import java.util.Map;

public record MetricasResponseDTO(
        Long totalConsumidores,
        Long totalEntregadores,
        Long totalEstabelecimentos,
        Long pedidosHoje,
        List<Map<String, Object>> pedidosPorDia
) {
}
