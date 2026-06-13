package com.ggl.backend.mapper;

import com.ggl.backend.dto.PedidoRequestDTO;
import com.ggl.backend.dto.PedidoResponseDTO;
import com.ggl.backend.dto.ItemPedidoResponseDTO;
import com.ggl.backend.entity.Consumidor;
import com.ggl.backend.entity.Entregador;
import com.ggl.backend.entity.Estabelecimento;
import com.ggl.backend.entity.Pedido;
import com.ggl.backend.entity.enums.StatusPedidoEnum;

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
        pedido.setStatusPedido(StatusPedidoEnum.PENDENTE);
        pedido.setFormaPagamento(dto.formaPagamento());
        pedido.setValorTotal(dto.valorTotal());

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
                pedido.getEstabelecimento().getNome(),
                pedido.getConsumidor().getId(),
                pedido.getEntregador() != null
                        ? pedido.getEntregador().getId()
                        : null,
                pedido.getEndereco() != null
                        ? pedido.getEndereco().getLogradouro() + ", " + pedido.getEndereco().getNumero()
                        : null,
                pedido.getEndereco() != null ? pedido.getEndereco().getPontoReferencia() : null,
                pedido.getItens().stream()
                        .map(item -> new ItemPedidoResponseDTO(
                                item.getProdutoIdMongo(),
                                item.getNomeProdutoSnapshot(),
                                item.getQuantidade(),
                                item.getPrecoUnitario()
                        ))
                        .toList()
        );

        return responseDTO;
    }
}
