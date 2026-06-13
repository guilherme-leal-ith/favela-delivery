package com.ggl.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ggl.backend.entity.enums.FormaPagamentoEnum;
import com.ggl.backend.entity.enums.StatusPedidoEnum;

import java.math.BigDecimal;
import java.util.List;

public record PedidoRequestDTO(
        @JsonAlias("status")
        StatusPedidoEnum statusPedido,
        @JsonAlias("forma_pagamento")
        FormaPagamentoEnum formaPagamento,
        @JsonAlias("fk_estabelecimento_id")
        Integer estabelecimentoId,
        @JsonAlias("fk_consumidor_id")
        Integer consumidorId,
        @JsonAlias("fk_entregador_id")
        Integer entregadorId,
        @JsonAlias("endereco_id")
        Integer enderecoId,
        @JsonAlias("valor_total")
        BigDecimal valorTotal,
        List<ItemPedidoRequestDTO> itens
) {
}
