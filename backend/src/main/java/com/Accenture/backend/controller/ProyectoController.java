package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.domain.service.ProyectoService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/proyecto")
public class ProyectoController {
    private final ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @PostMapping
    public ResponseEntity<ProyectoDTO> createProject(@RequestBody ProyectoDTO proyectoDTO) {
        ProyectoDTO proyectoGuardado = proyectoService.crearProyecto(proyectoDTO);
        return ResponseEntity.ok(proyectoGuardado);
    }

}
