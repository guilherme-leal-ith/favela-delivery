package com.ggl.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "consumidor")
@PrimaryKeyJoinColumn(name = "fk_id")
@Getter
@Setter
@NoArgsConstructor
public class Consumidor extends Usuario{

    @Column(name = "cpf", length = 14, unique = true, nullable = false)
    private String cpf;

    @OneToMany(mappedBy = "consumidor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Endereco> enderecos = new ArrayList<>();

    public void adicionarEndereco(Endereco endereco){
        this.enderecos.add(endereco);
        endereco.setConsumidor(this);
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos = enderecos;
    }
}
