package com.ggl.backend.controller;

import com.ggl.backend.dto.EnderecoRequestDTO;
import com.ggl.backend.dto.EnderecoResponseDTO;
import com.ggl.backend.service.EnderecoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enderecos")
@CrossOrigin(origins = "*")
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnderecoResponseDTO criar(@RequestBody EnderecoRequestDTO dto) {
        return enderecoService.criar(dto);
    }

    @GetMapping("/consumidor/{id}")
    public List<EnderecoResponseDTO> listarPorConsumidor(@PathVariable Integer id) {
        return enderecoService.listarPorConsumidor(id);
    }

    @PutMapping("/{id}")
    public EnderecoResponseDTO atualizar(@PathVariable Integer id, @RequestBody EnderecoRequestDTO dto) {
        return enderecoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        enderecoService.deletar(id);
    }
}
