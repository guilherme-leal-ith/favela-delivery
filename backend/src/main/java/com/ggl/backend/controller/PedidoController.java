package com.ggl.backend.controller;

import com.ggl.backend.dto.PedidoRequestDTO;
import com.ggl.backend.dto.PedidoResponseDTO;
import com.ggl.backend.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<PedidoResponseDTO> listarTodos() {
        return pedidoService.listarTodos();
    }

    @GetMapping("/{id}")
    public PedidoResponseDTO buscarPorId(
            @PathVariable Integer id) {

        return pedidoService.buscarPorId(id);
    }

    @PostMapping
    public PedidoResponseDTO criar(
            @RequestBody PedidoRequestDTO dto) {

        return pedidoService.criar(dto);
    }

    @PutMapping("/{id}")
    public PedidoResponseDTO atualizar(
            @PathVariable Integer id,
            @RequestBody PedidoRequestDTO dto) {

        return pedidoService.atualizar(id, dto);
    }

    @GetMapping("/consumidor/{id}")
    public List<PedidoResponseDTO> listarPorConsumidor(@PathVariable Integer id) {
        return pedidoService.listarPorConsumidor(id);
    }

    @GetMapping("/entregador/{id}")
    public List<PedidoResponseDTO> listarPorEntregador(@PathVariable Integer id) {
        return pedidoService.listarPorEntregador(id);
    }

    @GetMapping("/estabelecimento/{id}")
    public List<PedidoResponseDTO> listarPorEstabelecimento(@PathVariable Integer id) {
        return pedidoService.listarPorEstabelecimento(id);
    }

    @GetMapping("/disponiveis-entrega")
    public List<PedidoResponseDTO> listarDisponiveisEntrega() {
        return pedidoService.listarDisponiveisEntrega();
    }

    @DeleteMapping("/{id}")
    public void deletar(
            @PathVariable Integer id) {

        pedidoService.deletar(id);
    }
}
