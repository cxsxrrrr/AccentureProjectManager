package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.HistorialCambiosDTO;
import com.Accenture.backend.domain.service.HistorialCambiosService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@RestController
@RequestMapping("/api/historial")
public class HistorialCambiosController {

    private final HistorialCambiosService historialService;

    public HistorialCambiosController(HistorialCambiosService historialService) {
        this.historialService = historialService;
    }

    // Guardar Historial
    @PostMapping
    public ResponseEntity<HistorialCambiosDTO> saveHistory(@RequestBody HistorialCambiosDTO historialDTO) {
        HistorialCambiosDTO historialGuardado = historialService.guardarHistorial(historialDTO);
        return ResponseEntity.ok(historialGuardado);
    }

    // Obtener Historial
    @GetMapping
    public ResponseEntity<List<HistorialCambiosDTO>> getHistory() {
        List<HistorialCambiosDTO> historial = (List<HistorialCambiosDTO>) historialService.obtenerHistorial();
        return ResponseEntity.ok(historial);
    }

    // Obtener Historial x idUsuario
    @GetMapping("/{id}")
    public ResponseEntity<List<HistorialCambiosDTO>> getHistoryxId(@PathVariable Long id) {
        List<HistorialCambiosDTO> historial = historialService.obtenerHistorialxId(id);
        return ResponseEntity.ok(historial);
    }

}
