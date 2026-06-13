package com.ggl.backend.service;

import com.ggl.backend.dto.PedidoRequestDTO;
import com.ggl.backend.dto.PedidoResponseDTO;
import com.ggl.backend.dto.ItemPedidoRequestDTO;
import com.ggl.backend.entity.*;
import com.ggl.backend.entity.enums.FormaPagamentoEnum;
import com.ggl.backend.entity.enums.StatusPedidoEnum;
import com.ggl.backend.mapper.PedidoMapper;
import com.ggl.backend.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;
    private final ConsumidorRepository consumidorRepository;
    private final EntregadorRepository entregadorRepository;
    private final EnderecoRepository enderecoRepository;

    public PedidoService(
            PedidoRepository pedidoRepository,
            EstabelecimentoRepository estabelecimentoRepository,
            ConsumidorRepository consumidorRepository,
            EntregadorRepository entregadorRepository,
            EnderecoRepository enderecoRepository
    ) {
        this.pedidoRepository = pedidoRepository;
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.consumidorRepository = consumidorRepository;
        this.entregadorRepository = entregadorRepository;
        this.enderecoRepository = enderecoRepository;
    }

    public List<PedidoResponseDTO> listarTodos() {

        return pedidoRepository.findAll()
                .stream()
                .map(PedidoMapper::toResponseDTO)
                .toList();
    }

    public PedidoResponseDTO buscarPorId(Integer id) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        return PedidoMapper.toResponseDTO(pedido);
    }

    public PedidoResponseDTO criar(PedidoRequestDTO dto) {
        BigDecimal valorTotal = dto.valorTotal();
        if (valorTotal == null && dto.itens() != null) {
            valorTotal = dto.itens().stream()
                    .map(item -> valorItem(item).multiply(BigDecimal.valueOf(item.quantidade() == null ? 1 : item.quantidade())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
        if (valorTotal == null || valorTotal.compareTo(new BigDecimal("10.00")) < 0) {
            throw new RuntimeException("Pedido mínimo é R$ 10,00");
        }

        Estabelecimento estabelecimento =
                estabelecimentoRepository.findById(dto.estabelecimentoId())
                        .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado"));

        Consumidor consumidor =
                consumidorRepository.findById(dto.consumidorId())
                        .orElseThrow(() -> new RuntimeException("Consumidor não encontrado"));

        Entregador entregador = null;

        if (dto.entregadorId() != null) {
            entregador = entregadorRepository.findById(dto.entregadorId())
                    .orElseThrow(() -> new RuntimeException("Entregador não encontrado"));
        }

        Endereco endereco = null;
        if (dto.enderecoId() != null) {
            endereco = enderecoRepository.findById(dto.enderecoId())
                    .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        }

        Pedido pedido = PedidoMapper.toEntity(
                new PedidoRequestDTO(StatusPedidoEnum.PENDENTE, dto.formaPagamento() == null ? FormaPagamentoEnum.PIX : dto.formaPagamento(),
                        dto.estabelecimentoId(), dto.consumidorId(), dto.entregadorId(), dto.enderecoId(), valorTotal, dto.itens()),
                estabelecimento,
                consumidor,
                entregador
        );
        pedido.setEndereco(endereco);
        if (dto.itens() != null) {
            for (ItemPedidoRequestDTO itemDto : dto.itens()) {
                pedido.adicionarItem(toItem(itemDto));
            }
        }

        pedido = pedidoRepository.save(pedido);

        return PedidoMapper.toResponseDTO(pedido);
    }

    public PedidoResponseDTO atualizar(Integer id, PedidoRequestDTO dto) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (dto.statusPedido() != null) {
            pedido.setStatusPedido(dto.statusPedido());
        }
        if (dto.entregadorId() != null) {
            if (pedido.getEntregador() != null && !pedido.getEntregador().getId().equals(dto.entregadorId())) {
                throw new RuntimeException("Pedido já possui entregador");
            }
            Entregador entregador = entregadorRepository.findById(dto.entregadorId())
                    .orElseThrow(() -> new RuntimeException("Entregador não encontrado"));
            pedido.setEntregador(entregador);
            pedido.setStatusPedido(StatusPedidoEnum.A_CAMINHO);
        }
        if (dto.valorTotal() != null) {
            pedido.setValorTotal(dto.valorTotal());
        }
        return PedidoMapper.toResponseDTO(pedidoRepository.save(pedido));
    }

    public List<PedidoResponseDTO> listarPorConsumidor(Integer id) {
        return pedidoRepository.findByConsumidorIdOrderByDataHoraDesc(id).stream()
                .map(PedidoMapper::toResponseDTO)
                .toList();
    }

    public List<PedidoResponseDTO> listarPorEntregador(Integer id) {
        return pedidoRepository.findByEntregadorIdOrderByDataHoraDesc(id).stream()
                .map(PedidoMapper::toResponseDTO)
                .toList();
    }

    public List<PedidoResponseDTO> listarPorEstabelecimento(Integer id) {
        return pedidoRepository.findByEstabelecimentoIdOrderByDataHoraDesc(id).stream()
                .map(PedidoMapper::toResponseDTO)
                .toList();
    }

    public List<PedidoResponseDTO> listarDisponiveisEntrega() {
        return pedidoRepository.findByStatusPedidoAndEntregadorIsNullOrderByDataHoraDesc(StatusPedidoEnum.EM_PREPARO).stream()
                .map(PedidoMapper::toResponseDTO)
                .toList();
    }

    public void deletar(Integer id) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedidoRepository.delete(pedido);
    }

    private ItemPedido toItem(ItemPedidoRequestDTO dto) {
        ItemPedido item = new ItemPedido();
        item.setProdutoIdMongo(dto.produtoId());
        item.setNomeProdutoSnapshot(dto.nome() == null || dto.nome().isBlank() ? "Produto" : dto.nome());
        item.setQuantidade(dto.quantidade() == null || dto.quantidade() <= 0 ? 1 : dto.quantidade());
        item.setPrecoUnitario(valorItem(dto));
        return item;
    }

    private BigDecimal valorItem(ItemPedidoRequestDTO dto) {
        return dto.precoUnitario() == null ? BigDecimal.ZERO : dto.precoUnitario();
    }
}
