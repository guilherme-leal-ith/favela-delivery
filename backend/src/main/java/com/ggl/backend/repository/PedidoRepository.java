package com.ggl.backend.repository;

import com.ggl.backend.entity.Pedido;
import com.ggl.backend.entity.enums.StatusPedidoEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByConsumidorIdOrderByDataHoraDesc(Integer consumidorId);
    List<Pedido> findByEntregadorIdOrderByDataHoraDesc(Integer entregadorId);
    List<Pedido> findByEstabelecimentoIdOrderByDataHoraDesc(Integer estabelecimentoId);
    List<Pedido> findByStatusPedidoAndEntregadorIsNullOrderByDataHoraDesc(StatusPedidoEnum statusPedido);
    long countByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
}
