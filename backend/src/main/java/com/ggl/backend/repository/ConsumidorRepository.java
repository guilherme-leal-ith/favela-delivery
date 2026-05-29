package com.ggl.backend.repository;

import com.ggl.backend.entity.Consumidor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumidorRepository extends JpaRepository<Consumidor, Integer> {

    Consumidor findByCpf(String cpf);
}
