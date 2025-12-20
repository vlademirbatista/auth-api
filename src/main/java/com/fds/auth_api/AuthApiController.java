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

    // DTO de entrada
    public record LoginRequest(String email, String senha) {
    }

    // DTO de saída simples
    public record Mensagem(String message) {
    }
}