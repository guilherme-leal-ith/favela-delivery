package com.ggl.backend.controller;

import com.ggl.backend.dto.LoginRequestDTO;
import com.ggl.backend.dto.LoginResponseDTO;
import com.ggl.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return authService.login(dto);
    }
}
