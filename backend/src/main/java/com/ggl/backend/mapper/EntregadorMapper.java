package com.ggl.backend.mapper;

import com.ggl.backend.dto.EntregadorRequestDTO;
import com.ggl.backend.dto.EntregadorResponseDTO;
import com.ggl.backend.entity.Entregador;

public class EntregadorMapper {

    public static Entregador toEntity(EntregadorRequestDTO requestDTO) {
        Entregador entregador = new Entregador();

        entregador.setNome(requestDTO.nome());
        entregador.setEmail(requestDTO.email());
        entregador.setSenha(requestDTO.senha());
        entregador.setCnh(requestDTO.cnh());
        entregador.setVeiculoEnum(requestDTO.veiculo());
        entregador.setDataNasicmento(requestDTO.dataNascimento());
        entregador.setDisponivel(requestDTO.isDisponivel() != null ? requestDTO.isDisponivel() : true);

        return entregador;
    }

    public static EntregadorResponseDTO toResponseDTO(Entregador entregador) {

        return new EntregadorResponseDTO(
                entregador.getId(),
                entregador.getVeiculoEnum(),
                entregador.getCnh(),
                entregador.getDataNasicmento(),
                entregador.getDisponivel()
        );
    }
}
