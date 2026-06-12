package com.ggl.backend.controller;
import org.springframework.web.bind.annotation.RestController;
import com.ggl.backend.dto.UsuarioRequestDTO;
import com.ggl.backend.dto.UsuarioResponseDTO;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.mapper.UsuarioMapper;
import com.ggl.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/user", "/api/usuarios"})
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioResponseDTO> getEmail(@PathVariable String email) {
        return ResponseEntity.ok(usuarioService.findByEmail(email));
    }

    @PostMapping //RequestBody transforma a requisicao HTTP naquele tipo
    public UsuarioResponseDTO create(@Valid @RequestBody UsuarioRequestDTO requestDTO) {
        return usuarioService.saveUsuario(requestDTO);
    }

    @GetMapping
    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public UsuarioResponseDTO buscarPorId(@PathVariable Integer id) {
        return usuarioService.findById(id);
    }

    @PutMapping("/{id}")
    public UsuarioResponseDTO atualizar(@PathVariable Integer id, @RequestBody UsuarioRequestDTO requestDTO) {
        return usuarioService.atualizar(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        usuarioService.deletar(id);
    }
}
