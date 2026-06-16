package com.ggl.backend.controller;

import com.ggl.backend.dto.EstabelecimentoResponseDTO;
import com.ggl.backend.dto.MetricasResponseDTO;
import com.ggl.backend.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")

public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/estabelecimentos/pendentes")
    public List<EstabelecimentoResponseDTO> estabelecimentosPendentes() {
        return adminService.estabelecimentosPendentes();
    }

    @PutMapping("/estabelecimentos/{id}/aprovar")
    public EstabelecimentoResponseDTO aprovar(@PathVariable Integer id) {
        return adminService.alterarFuncionamento(id, true);
    }

    @PutMapping("/estabelecimentos/{id}/rejeitar")
    public EstabelecimentoResponseDTO rejeitar(@PathVariable Integer id) {
        return adminService.alterarFuncionamento(id, false);
    }

    @PutMapping("/estabelecimentos/{id}/bloquear")
    public EstabelecimentoResponseDTO bloquear(@PathVariable Integer id) {
        return adminService.alterarFuncionamento(id, false);
    }

    @GetMapping("/metricas")
    public MetricasResponseDTO metricas() {
        return adminService.metricas();
    }
}
