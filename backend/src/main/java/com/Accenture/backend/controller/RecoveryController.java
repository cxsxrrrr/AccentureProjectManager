package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Accenture.backend.domain.service.UsuarioService;
import lombok.Data;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth/recovery")
public class RecoveryController {
    private final UsuarioService usuarioService;
    // Mapa temporal para almacenar códigos de recuperación (en memoria)
    private final ConcurrentHashMap<String, String> recoveryCodes = new ConcurrentHashMap<>();

    @Autowired
    public RecoveryController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Clase DTO para request de email (debe ser static para deserialización correcta)
    @Data
    public static class EmailRequest {
        private String email;
    }
    @Data
    public static class CodeRequest {
        private String email;
        private String code;
    }

    // Endpoint para enviar código de recuperación
    @PostMapping("/send-code")
    public ResponseEntity<String> sendRecoveryCode(@RequestBody EmailRequest request) {
        String email = request.getEmail();
        // Generar código de 6 dígitos
        String code = String.format("%06d", new Random().nextInt(1000000));
        // Aquí deberías enviar el código por correo (usa tu servicio real de correo)
        usuarioService.enviarCodigoRecuperacion(email, code);
        recoveryCodes.put(email, code);
        return ResponseEntity.ok("Código de recuperación enviado al correo si existe en el sistema.");
    }

    // Endpoint para validar el código
    @PostMapping("/validate-code")
    public ResponseEntity<String> validateRecoveryCode(@RequestBody CodeRequest request) {
        String email = request.getEmail();
        String code = request.getCode();
        String stored = recoveryCodes.get(email);
        if (stored != null && stored.equals(code)) {
            // Código correcto, eliminarlo para un solo uso
            recoveryCodes.remove(email);
            return ResponseEntity.ok("Código válido. Puedes restablecer la contraseña.");
        } else {
            return ResponseEntity.status(400).body("Código incorrecto o expirado.");
        }
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
