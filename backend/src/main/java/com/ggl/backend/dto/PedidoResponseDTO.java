package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ggl.backend.entity.enums.FormaPagamentoEnum;
import com.ggl.backend.entity.enums.StatusPedidoEnum;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoResponseDTO(
        Integer id,
        @JsonProperty("data_hora")
        LocalDateTime dataHora,
        @JsonProperty("status")
        StatusPedidoEnum statusPedido,
        @JsonProperty("forma_pagamento")
        FormaPagamentoEnum formaPagamento,
        @JsonProperty("valor_total")
        BigDecimal valorTotal,
        @JsonProperty("fk_estabelecimento_id")
        Integer estabelecimentoId,
        String estabelecimento,
        @JsonProperty("fk_consumidor_id")
        Integer consumidorId,
        @JsonProperty("fk_entregador_id")
        Integer entregadorId,
        String endereco,
        @JsonProperty("ponto_referencia")
        String pontoReferencia,
        List<ItemPedidoResponseDTO> itens
) {
}
