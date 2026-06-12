package com.ggl.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;

public class AvaliacaoProduto {

    @Field("fk_pedido_id")
    @JsonProperty("fk_pedido_id")
    private Integer fkPedidoId;

    private Integer nota;
    private String comentario;

    public Integer getFkPedidoId() {
        return fkPedidoId;
    }

    public void setFkPedidoId(Integer fkPedidoId) {
        this.fkPedidoId = fkPedidoId;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}
