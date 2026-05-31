package com.ggl.backend.controller;

import com.ggl.backend.dto.ConsumidorRequestDTO;
import com.ggl.backend.dto.ConsumidorResponseDTO;
import com.ggl.backend.service.ConsumidorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/consumidor")
public class ConsumidorController {

    private final ConsumidorService consumidorService;

    public ConsumidorController(ConsumidorService consumidorService){
        this.consumidorService = consumidorService;
    }

    @PostMapping
    public ResponseEntity<ConsumidorResponseDTO> create(@Valid @RequestBody ConsumidorRequestDTO requestDTO){
        ConsumidorResponseDTO novoConsumidor = consumidorService.saveConsumidor(requestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoConsumidor);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsumidorResponseDTO> getById(@PathVariable Integer id){
        ConsumidorResponseDTO consumidor = consumidorService.findById(id);

        return ResponseEntity.ok(consumidor);
    }
}
