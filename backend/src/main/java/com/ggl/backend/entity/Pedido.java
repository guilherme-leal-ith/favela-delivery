package com.ggl.backend.entity;

import com.ggl.backend.entity.enums.FormaPagamentoEnum;
import com.ggl.backend.entity.enums.StatusPedidoEnum;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
public class Pedido {

    public Pedido(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "status_pedido", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusPedidoEnum statusPedido;

    @Column(name = "forma_pagamento", nullable = false)
    @Enumerated(EnumType.STRING)
    private FormaPagamentoEnum formaPagamento;

    @Column(name = "valor_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @ManyToOne
    @JoinColumn(name = "fk_estabelecimento_id", nullable = false)
    private Estabelecimento estabelecimento;

    @ManyToOne
    @JoinColumn(name = "fk_consumidor_id", nullable = false)
    private Consumidor consumidor;

    @ManyToOne
    @JoinColumn(name = "fk_entregador_id", nullable = false)
    private Entregador entregador;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusPedidoEnum getStatusPedido() {
        return statusPedido;
    }

    public void setStatusPedido(StatusPedidoEnum statusPedido) {
        this.statusPedido = statusPedido;
    }

    public FormaPagamentoEnum getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(FormaPagamentoEnum formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Estabelecimento getEstabelecimento() {
        return estabelecimento;
    }

    public void setEstabelecimento(Estabelecimento estabelecimento) {
        this.estabelecimento = estabelecimento;
    }

    public Consumidor getConsumidor() {
        return consumidor;
    }

    public void setConsumidor(Consumidor consumidor) {
        this.consumidor = consumidor;
    }

    public Entregador getEntregador() {
        return entregador;
    }

    public void setEntregador(Entregador entregador) {
        this.entregador = entregador;
    }
}
