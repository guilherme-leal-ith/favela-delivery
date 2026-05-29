package com.ggl.backend.mapper;

import com.ggl.backend.dto.ConsumidorRequestDTO;
import com.ggl.backend.dto.ConsumidorResponseDTO;
import com.ggl.backend.entity.Consumidor;

public class ConsumidorMapper {

    public static Consumidor toEntity(ConsumidorRequestDTO dto, String senhaHash){
        Consumidor consumidor = new Consumidor();
        consumidor.setNome(dto.nome());
        consumidor.setEmail(dto.email());
        consumidor.setSenha(senhaHash);
        return consumidor;
    }

    public static ConsumidorResponseDTO toResponseDTO(Consumidor consumidor){
        return new ConsumidorResponseDTO(
                consumidor.getId(),
                consumidor.getNome(),
                consumidor.getEmail(),
                consumidor.getCpf()
        );
    }

}
