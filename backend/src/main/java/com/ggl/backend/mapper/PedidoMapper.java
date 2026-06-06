package com.ggl.backend.mapper;

import com.ggl.backend.dto.PedidoRequestDTO;
import com.ggl.backend.dto.PedidoResponseDTO;
import com.ggl.backend.entity.Consumidor;
import com.ggl.backend.entity.Entregador;
import com.ggl.backend.entity.Estabelecimento;
import com.ggl.backend.entity.Pedido;

import java.time.LocalDateTime;

public class PedidoMapper {

    public static Pedido toEntity(
            PedidoRequestDTO dto,
            Estabelecimento estabelecimento,
            Consumidor consumidor,
            Entregador entregador
    ) {

        Pedido pedido = new Pedido();

        pedido.setDataHora(LocalDateTime.now());
        pedido.setStatusPedido(dto.statusPedido());
        pedido.setFormaPagamento(dto.formaPagamento());

        pedido.setEstabelecimento(estabelecimento);
        pedido.setConsumidor(consumidor);
        pedido.setEntregador(entregador);

        return pedido;
    }

    public static PedidoResponseDTO toResponseDTO(Pedido pedido) {

        PedidoResponseDTO responseDTO = new PedidoResponseDTO(
                pedido.getId(),
                pedido.getDataHora(),
                pedido.getStatusPedido(),
                pedido.getFormaPagamento(),
                pedido.getValorTotal(),
                pedido.getEstabelecimento().getId(),
                pedido.getConsumidor().getId(),
                pedido.getEntregador() != null
                        ? pedido.getEntregador().getId()
                        : null
        );

        return responseDTO;
    }
}