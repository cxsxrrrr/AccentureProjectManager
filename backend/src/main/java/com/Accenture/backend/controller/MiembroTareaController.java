package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.MiembroTareaDTO;
import com.Accenture.backend.domain.service.MiembroTareaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/miembro-tareas")
public class MiembroTareaController {

    private final MiembroTareaService miembroTareaService;

    public MiembroTareaController(MiembroTareaService miembroTareaService) {
        this.miembroTareaService = miembroTareaService;
    }

    @PostMapping
    public ResponseEntity<MiembroTareaDTO> crear(@RequestBody MiembroTareaDTO dto) {
        MiembroTareaDTO creado = miembroTareaService.crearMiembroTarea(dto);
        return ResponseEntity.ok(creado);
    }

    @GetMapping("/proyecto/{proyectoId}")
    public List<MiembroTareaDTO> obtenerPorProyecto(@PathVariable Long proyectoId) {
        return miembroTareaService.getByProyectoId(proyectoId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<MiembroTareaDTO> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return miembroTareaService.getByUsuarioId(usuarioId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MiembroTareaDTO> obtenerPorId(@PathVariable Long id) {
        MiembroTareaDTO dto = miembroTareaService.getMiembroTareaById(id);
        return (dto != null) ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }
}
