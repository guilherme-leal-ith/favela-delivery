package com.ggl.backend.repository;

import com.ggl.backend.entity.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {
    List<Endereco> findByConsumidorId(Integer consumidorId);
}
