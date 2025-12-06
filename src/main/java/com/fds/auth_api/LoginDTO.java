package com.fds.auth_api;

// DTO = Data Transfer Object
// Representa os dados QUE CHEGAM na requisição de login
public record LoginDTO(
        String email,
        String senha
) {}