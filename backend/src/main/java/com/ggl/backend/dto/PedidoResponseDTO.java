package com.ggl.backend.dto;

import com.ggl.backend.entity.FormaPagamento;
import com.ggl.backend.entity.StatusPedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PedidoResponseDTO(
        Integer id,
        LocalDateTime dataHora,
        StatusPedido statusPedido,
        FormaPagamento formaPagamento,
        BigDecimal valorTotal,
        Integer estabelecimentoId,
        Integer consumidorId,
        Integer entregadorId
) {
}
