package com.fds.auth_api;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Para buscar usuário por email
    Optional<Usuario> findByEmail(String email);
}