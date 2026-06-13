package com.ggl.backend.mapper;

import com.ggl.backend.dto.EstabelecimentoRequestDTO;
import com.ggl.backend.dto.EstabelecimentoResponseDTO;
import com.ggl.backend.entity.Estabelecimento;

public class EstabelecimentoMapper {

    public static Estabelecimento toEntity(EstabelecimentoRequestDTO dto) {
        Estabelecimento estabelecimento = new Estabelecimento();

        estabelecimento.setNome(dto.nome());
        estabelecimento.setEmail(dto.email());
        estabelecimento.setSenha(dto.senha());
        estabelecimento.setCnpj(dto.cnpj());
        estabelecimento.setAberto(dto.isAberto() != null ? dto.isAberto() : false);

        return estabelecimento;
    }

    public static EstabelecimentoResponseDTO toResponseDTO(Estabelecimento estabelecimento) {
        return new EstabelecimentoResponseDTO(
                estabelecimento.getId(),
                estabelecimento.getNome(),
                "Geral",
                0.0,
                estabelecimento.getCnpj(),
                estabelecimento.getAberto(),
                estabelecimento.getAberto()
        );
    }
}
