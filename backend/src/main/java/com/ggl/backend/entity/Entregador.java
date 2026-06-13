package com.ggl.backend.entity;

import com.ggl.backend.entity.enums.VeiculoEnum;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "entregador")
@PrimaryKeyJoinColumn(name = "fk_id")
// extende por causa da relaçao das tabelas de herança
public class Entregador extends Usuario {

    public Entregador(){}

    @Column(name = "veiculo", nullable = false)
    @Enumerated(EnumType.STRING)
    private VeiculoEnum veiculoEnum;

    @Column(name = "cnh", unique = true, length = 11)
    private String cnh;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNasicmento;

    @Column(name = "is_disponivel")
    private Boolean isDisponivel;

    public VeiculoEnum getVeiculoEnum() {
        return veiculoEnum;
    }

    public void setVeiculoEnum(VeiculoEnum veiculoEnum) {
        this.veiculoEnum = veiculoEnum;
    }

    public String getCnh() {
        return cnh;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }

    public LocalDate getDataNasicmento() {
        return dataNasicmento;
    }

    public void setDataNasicmento(LocalDate dataNasicmento) {
        this.dataNasicmento = dataNasicmento;
    }

    public Boolean getDisponivel() {
        return isDisponivel;
    }

    public void setDisponivel(Boolean disponivel) {
        isDisponivel = disponivel;
    }
}
