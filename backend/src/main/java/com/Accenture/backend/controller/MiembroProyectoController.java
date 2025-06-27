package com.Accenture.backend.controller;

import com.Accenture.backend.model.MiembroProyecto;
import com.Accenture.backend.domain.dto.MiembroProyectoDTO;
import com.Accenture.backend.domain.service.MiembroProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/miembros-proyectos")
@CrossOrigin(origins = "*")
public class MiembroProyectoController {

    @Autowired
    private MiembroProyectoService miembroProyectoService;

    // Obtener todos los miembros asignados a un proyecto
    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<MiembroProyectoDTO>> listarPorProyecto(@PathVariable Long proyectoId) {
        List<MiembroProyectoDTO> miembros = miembroProyectoService.listarPorProyecto(proyectoId);
        return ResponseEntity.ok(miembros);
    }

    // Obtener todos los proyectos en los que está un usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<MiembroProyectoDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        List<MiembroProyectoDTO> proyectos = miembroProyectoService.listarPorUsuario(usuarioId);
        return ResponseEntity.ok(proyectos);
    }

    // Asignar un usuario a un proyecto
    @PostMapping
    public ResponseEntity<MiembroProyectoDTO> guardarMiembro(@RequestBody MiembroProyectoDTO dto) {
        MiembroProyectoDTO guardado = miembroProyectoService.guardar(dto);
        return ResponseEntity.ok(guardado);
    }
}
