package com.Accenture.backend.controller;

import com.Accenture.backend.dto.ProyectoDTO;
import com.Accenture.backend.service.ProyectoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
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
