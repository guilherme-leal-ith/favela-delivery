package com.ggl.backend.controller;
import org.springframework.http.HttpStatus;
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

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioRequestDTO dados) { // ou UsuarioRequestDTO
        try {
            // Chama o service que agora valida a senha de verdade!
            UsuarioResponseDTO usuarioLogado = usuarioService.efetuarLogin(dados.email(), dados.senha());
            return ResponseEntity.ok(usuarioLogado);
        } catch (RuntimeException e) {
            // Se a senha estiver errada, cai aqui e devolve erro 401 (Não Autorizado) para o React
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
