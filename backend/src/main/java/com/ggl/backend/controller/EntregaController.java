package com.ggl.backend.controller;

import com.ggl.backend.dto.PedidoRequestDTO;
import com.ggl.backend.dto.PedidoResponseDTO;
import com.ggl.backend.entity.enums.StatusPedidoEnum;
import com.ggl.backend.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entregas")
public class EntregaController {

    private final PedidoService pedidoService;

    public EntregaController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping("/disponiveis")
    public List<PedidoResponseDTO> listarDisponiveis() {
        return pedidoService.listarDisponiveisEntrega();
    }

    @PutMapping("/{pedidoId}/aceitar/{entregadorId}")
    public PedidoResponseDTO aceitarEntrega(
            @PathVariable Integer pedidoId,
            @PathVariable Integer entregadorId
    ) {
        PedidoRequestDTO dto = new PedidoRequestDTO(
                StatusPedidoEnum.A_CAMINHO,
                null,
                null,
                null,
                entregadorId,
                null,
                null,
                null
        );
        return pedidoService.atualizar(pedidoId, dto);
    }

    @PutMapping("/{pedidoId}/concluir")
    public PedidoResponseDTO concluirEntrega(@PathVariable Integer pedidoId) {
        PedidoRequestDTO dto = new PedidoRequestDTO(
                StatusPedidoEnum.ENTREGUE,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
        return pedidoService.atualizar(pedidoId, dto);
    }
}
