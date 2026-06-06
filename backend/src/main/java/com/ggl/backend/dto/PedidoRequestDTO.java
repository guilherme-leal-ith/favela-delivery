package com.ggl.backend.dto;

import com.ggl.backend.entity.FormaPagamento;
import com.ggl.backend.entity.StatusPedido;

public record PedidoRequestDTO(
        StatusPedido statusPedido,
        FormaPagamento formaPagamento,
        Integer estabelecimentoId,
        Integer consumidorId,
        Integer entregadorId
) {
}
