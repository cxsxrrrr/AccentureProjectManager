package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.HistorialCambiosDTO;
import com.Accenture.backend.domain.service.HistorialCambiosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/historial")
public class HistorialCambiosController {

    private final HistorialCambiosService historialService;

    public HistorialCambiosController(HistorialCambiosService historialService) {
        this.historialService = historialService;
    }

    // Guardar historial
    @PostMapping
    public ResponseEntity<HistorialCambiosDTO> saveHistory(@RequestBody HistorialCambiosDTO historialDTO) {
        HistorialCambiosDTO historialGuardado = historialService.guardarHistorial(historialDTO);
        return ResponseEntity.ok(historialGuardado);
    }


}
