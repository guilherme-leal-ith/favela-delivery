package com.ggl.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "produtos")
public class Produto {

    @Id
    private String id;

    @Indexed
    private String nome;

    private String descricao;
    private BigDecimal preco;

    @Indexed
    @Field("fk_estabelecimento_id")
    @JsonProperty("fk_estabelecimento_id")
    private Integer fkEstabelecimentoId;

    private List<AvaliacaoProduto> avaliacoes = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Integer getFkEstabelecimentoId() {
        return fkEstabelecimentoId;
    }

    public void setFkEstabelecimentoId(Integer fkEstabelecimentoId) {
        this.fkEstabelecimentoId = fkEstabelecimentoId;
    }

    public List<AvaliacaoProduto> getAvaliacoes() {
        return avaliacoes;
    }

    public void setAvaliacoes(List<AvaliacaoProduto> avaliacoes) {
        this.avaliacoes = avaliacoes == null ? new ArrayList<>() : avaliacoes;
    }
}
