package com.ggl.backend.config;

import com.ggl.backend.entity.Consumidor;
import com.ggl.backend.entity.Entregador;
import com.ggl.backend.entity.Estabelecimento;
import com.ggl.backend.entity.Usuario;
import com.ggl.backend.entity.enums.TipoUsuarioEnum;
import com.ggl.backend.entity.enums.VeiculoEnum;
import com.ggl.backend.repository.ConsumidorRepository;
import com.ggl.backend.repository.EntregadorRepository;
import com.ggl.backend.repository.EstabelecimentoRepository;
import com.ggl.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedRelacional(
            UsuarioRepository usuarioRepository,
            ConsumidorRepository consumidorRepository,
            EntregadorRepository entregadorRepository,
            EstabelecimentoRepository estabelecimentoRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (usuarioRepository.count() > 0) {
                return;
            }

            String senha = passwordEncoder.encode("123456");

            Consumidor consumidor = new Consumidor();
            consumidor.setNome("Ana Souza");
            consumidor.setEmail("consumidor@favelafood.com");
            consumidor.setSenha(senha);
            consumidor.setTipoUsuario(TipoUsuarioEnum.CONSUMIDOR);
            consumidor.setCpf("123.456.789-00");
            consumidorRepository.save(consumidor);

            Usuario admin = new Usuario();
            admin.setNome("Admin FavelaFood");
            admin.setEmail("admin@favelafood.com");
            admin.setSenha(senha);
            admin.setTipoUsuario(TipoUsuarioEnum.ADMINISTRADOR);
            usuarioRepository.save(admin);

            Entregador entregador = new Entregador();
            entregador.setNome("Joao Motoboy");
            entregador.setEmail("entregador@favelafood.com");
            entregador.setSenha(senha);
            entregador.setTipoUsuario(TipoUsuarioEnum.ENTREGADOR);
            entregador.setVeiculoEnum(VeiculoEnum.MOTO);
            entregador.setCnh("12345678901");
            entregador.setDataNasicmento(LocalDate.of(2000, 5, 10));
            entregador.setDisponivel(true);
            entregadorRepository.save(entregador);

            for (int i = 4; i <= 8; i++) {
                Usuario usuario = new Usuario();
                usuario.setNome("Usuario Demo " + i);
                usuario.setEmail("demo" + i + "@favelafood.com");
                usuario.setSenha(senha);
                usuario.setTipoUsuario(TipoUsuarioEnum.CONSUMIDOR);
                usuarioRepository.save(usuario);
            }

            criarEstabelecimento(estabelecimentoRepository, senha, "Burguer Palace", "loja9@favelafood.com", "12.345.678/0001-90", true);
            criarEstabelecimento(estabelecimentoRepository, senha, "Pizza Express", "loja10@favelafood.com", "12.345.678/0001-91", true);
            criarEstabelecimento(estabelecimentoRepository, senha, "Sushi House", "loja11@favelafood.com", "12.345.678/0001-92", true);
        };
    }

    private void criarEstabelecimento(
            EstabelecimentoRepository estabelecimentoRepository,
            String senha,
            String nome,
            String email,
            String cnpj,
            boolean aberto
    ) {
        Estabelecimento estabelecimento = new Estabelecimento();
        estabelecimento.setNome(nome);
        estabelecimento.setEmail(email);
        estabelecimento.setSenha(senha);
        estabelecimento.setTipoUsuario(TipoUsuarioEnum.ESTABELECIMENTO);
        estabelecimento.setCnpj(cnpj);
        estabelecimento.setAberto(aberto);
        estabelecimentoRepository.save(estabelecimento);
    }
}
