package com.ggl.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "estabelecimento")
@PrimaryKeyJoinColumn(name = "fk_id")
public class Estabelecimento extends Usuario {

    public Estabelecimento(){}

    @Column(name = "cnpj", unique = true, nullable = false, length = 18)
    private String cnpj;

    @Column(name = "is_aberto", nullable = false)
    private Boolean isAberto;

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Boolean getAberto() {
        return isAberto;
    }

    public void setAberto(Boolean aberto) {
        isAberto = aberto;
    }
}
