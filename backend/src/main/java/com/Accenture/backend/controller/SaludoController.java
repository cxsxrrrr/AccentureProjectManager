package com.Accenture.backend.controller;

import com.Accenture.backend.dto.SaludoDTO;
import com.Accenture.backend.service.SaludoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saludos")
public class SaludoController {

    private final SaludoService saludoService;

    public SaludoController(SaludoService saludoService) {
        this.saludoService = saludoService;
    }

    // Obtener todos los saludos
    @GetMapping
    public ResponseEntity<List<SaludoDTO>> obtenerSaludos() {
        List<SaludoDTO> saludos = saludoService.obtenerSaludos();
        return ResponseEntity.ok(saludos);
    }

    // Crear un saludo y guardarlo
    @PostMapping
    public ResponseEntity<SaludoDTO> saludar(@RequestBody SaludoDTO saludoDTO) {
        SaludoDTO saludoGuardado = saludoService.crearYGuardarSaludo(saludoDTO.getNombre());
        return ResponseEntity.ok(saludoGuardado);
    }
}
