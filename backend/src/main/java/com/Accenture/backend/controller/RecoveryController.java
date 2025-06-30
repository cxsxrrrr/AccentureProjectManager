package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Accenture.backend.domain.service.UsuarioService;
import lombok.Data;

@RestController
@RequestMapping("/api/auth/recovery")
public class RecoveryController {
    private final UsuarioService usuarioService;

    @Autowired
    public RecoveryController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Clase DTO para request de email (debe ser static para deserialización correcta)
    @Data
    public static class EmailRequest {
        private String email;
    }

    @PostMapping("/password")
    public ResponseEntity<String> recuperarPassword(@RequestBody EmailRequest request) {
        boolean ok = usuarioService.recuperarPasswordPorEmail(request.getEmail());
        if (ok) {
            return ResponseEntity.ok("Se ha enviado una nueva contraseña al correo.");
        } else {
            return ResponseEntity.status(404).body("No existe un usuario con ese correo.");
        }
    }
}
