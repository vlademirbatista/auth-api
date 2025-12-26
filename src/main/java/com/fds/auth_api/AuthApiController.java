package com.fds.auth_api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthApiController {

    private final UsuarioRepository usuarioRepository;

    public AuthApiController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/status")
    public ResponseEntity<?> status() {
        return ResponseEntity.ok().body(new Mensagem("API no ar!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return usuarioRepository.findByEmail(request.email())
                .filter(u -> u.getSenha() != null && u.getSenha().equals(request.senha()))
                .map(u -> ResponseEntity.ok().body(new Mensagem("Login OK")))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Mensagem("Credenciais inválidas")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistroDTO request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Mensagem("Email já cadastrado"));
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.nome());
        novoUsuario.setEmail(request.email());
        novoUsuario.setSenha(request.senha()); // Em produção, usar BCrypt aqui!
        novoUsuario.setCriadoEm(java.time.LocalDateTime.now());

        usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().body(new Mensagem("Usuário cadastrado com sucesso"));
    }

    // DTO de entrada
    public record LoginRequest(String email, String senha) {
    }

    // DTO de saída simples
    public record Mensagem(String message) {
    }
}