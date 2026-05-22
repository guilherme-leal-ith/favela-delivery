package com.ggl.backend.controller;

import com.ggl.backend.dto.UsuarioRequestDTO;
import com.ggl.backend.dto.UsuarioResponseDTO;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.mapper.UsuarioMapper;
import com.ggl.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/user")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioResponseDTO> getEmail(@PathVariable String email) {
        return ResponseEntity.ok(usuarioService.findByEmail(email));
    }

    @PostMapping //RequestBody transforma a requissicao HTTP naquele tipo
    public UsuarioResponseDTO create(@RequestBody UsuarioRequestDTO requestDTO) {
        return usuarioService.saveUsuario(requestDTO);
    }
}
