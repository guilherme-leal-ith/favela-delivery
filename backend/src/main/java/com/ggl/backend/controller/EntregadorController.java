package com.ggl.backend.controller;

import com.ggl.backend.dto.EntregadorRequestDTO;
import com.ggl.backend.dto.EntregadorResponseDTO;
import com.ggl.backend.service.EntregadorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping({"/api/entregador", "/api/entregadores"})
@CrossOrigin(origins = "*")

public class EntregadorController {

    private final EntregadorService entregadorService;

    public EntregadorController(EntregadorService entregadorService){
        this.entregadorService = entregadorService;
    }

    @PostMapping
    public ResponseEntity<EntregadorResponseDTO> create(@Valid @RequestBody EntregadorRequestDTO requestDTO){
        EntregadorResponseDTO novoEntregador = entregadorService.saveEntregador(requestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoEntregador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntregadorResponseDTO> getById(@PathVariable Integer id){
        EntregadorResponseDTO entregador = entregadorService.findById(id);

        return ResponseEntity.ok(entregador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntregadorResponseDTO> update(
            @PathVariable Integer id,
            @RequestBody EntregadorRequestDTO requestDTO
    ){
        return ResponseEntity.ok(entregadorService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        entregadorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
