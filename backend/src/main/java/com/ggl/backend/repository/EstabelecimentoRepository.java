package com.ggl.backend.repository;

import com.ggl.backend.entity.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstabelecimentoRepository extends
        JpaRepository<Estabelecimento, Integer> {
}
