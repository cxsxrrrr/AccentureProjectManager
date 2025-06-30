package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.TareaDTO;
import com.Accenture.backend.domain.service.TareaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    // Obtener todas las tareas de un proyecto
    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<TareaDTO>> listarPorProyecto(@PathVariable Long proyectoId) {
        List<TareaDTO> tareas = tareaService.listarPorProyecto(proyectoId);
        return ResponseEntity.ok(tareas);
    }

    // Listar tareas por estado
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<TareaDTO>> listarPorEstado(@PathVariable String estado) {
        List<TareaDTO> tareas = tareaService.listarPorEstado(estado);
        return ResponseEntity.ok(tareas);
    }

    // Listar tareas por prioridad
    @GetMapping("/prioridad/{prioridad}")
    public ResponseEntity<List<TareaDTO>> listarPorPrioridad(@PathVariable String prioridad) {
        List<TareaDTO> tareas = tareaService.listarPorPrioridad(prioridad);
        return ResponseEntity.ok(tareas);
    }

    // Guardar una tarea (crear o actualizar)
    @PutMapping
    public ResponseEntity<TareaDTO> guardar(@RequestBody TareaDTO tareaDTO) {
        TareaDTO tareaGuardada = tareaService.guardar(tareaDTO);
        return ResponseEntity.ok(tareaGuardada);
    }

    // Obtener todas las tareas
    @GetMapping
    public ResponseEntity<List<TareaDTO>> listarTodasLasTareas() {
        List<TareaDTO> tareas = tareaService.listarTodasLasTareas();
        return ResponseEntity.ok(tareas);
    }
}
