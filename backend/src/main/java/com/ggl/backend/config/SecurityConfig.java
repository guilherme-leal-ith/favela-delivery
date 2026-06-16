package com.ggl.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   /* @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Configura o CORS para aceitar o seu Front-end do React
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    return config;
                }))
                // 2. Desabilita o CSRF (necessário para APIs REST receberem POST)
                .csrf(csrf -> csrf.disable())
                // 3. Libera as rotas necessárias (as suas e as do seu colega)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/h2/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .anyRequest().authenticated()
                )
                // 4. Configurações extras para o console do H2 funcionar e desativa logins automáticos
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    // 5. Mantém o encoder de senha que o back-end precisa para funcionar
    @Bean
    public PasswordEncoder passwordHash() {
        return new BCryptPasswordEncoder();
    } */
   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
               .csrf(csrf -> csrf.disable()) // Desativa proteção CSRF para testes com o Postman/React
               .cors(cors -> cors.disable()) // Desativa o bloqueio de portas
               .authorizeHttpRequests(auth -> auth
                       .requestMatchers("/api/**").permitAll() // 🔥 Mude para permitir tudo dentro de /api/
                       .anyRequest().permitAll()
               );

       return http.build();
   }

   @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
