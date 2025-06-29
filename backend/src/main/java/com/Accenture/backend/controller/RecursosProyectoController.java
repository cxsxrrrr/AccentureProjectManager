package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.Accenture.backend.domain.dto.RecursosProyectoDTO;
import com.Accenture.backend.domain.service.RecursosProyectoService;

@RestController
@RequestMapping("/api/recursos-proyecto")
public class RecursosProyectoController {
    private final RecursosProyectoService service;

    @Autowired
    public RecursosProyectoController(RecursosProyectoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<RecursosProyectoDTO> create(@RequestBody RecursosProyectoDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<RecursosProyectoDTO> result = service.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("El recurso de proyecto con id " + id + " no existe.");
        }
    }

    @GetMapping
    public List<RecursosProyectoDTO> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecursosProyectoDTO> update(@PathVariable Long id, @RequestBody RecursosProyectoDTO dto) {
        dto.setRecursosProyectoId(id);
        RecursosProyectoDTO actualizado = service.update(dto);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok("Recurso de proyecto eliminado exitosamente.");
    }

    @GetMapping("/proyecto/{proyectoId}")
    public List<RecursosProyectoDTO> getByProyecto(@PathVariable Long proyectoId) {
        return service.findByProyectoId(proyectoId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<RecursosProyectoDTO> getByUsuario(@PathVariable Long usuarioId) {
        return service.findByAsignadoPor(usuarioId);
    }

    @GetMapping("/recurso/{recursoId}")
    public List<RecursosProyectoDTO> getByRecurso(@PathVariable Long recursoId) {
        return service.findByRecursoId(recursoId);
    }

    @GetMapping("/asignacion")
    public List<RecursosProyectoDTO> getByFechaAsignacion(@RequestParam LocalDateTime desde, @RequestParam LocalDateTime hasta) {
        return service.findByFechaAsignacionBetween(desde, hasta);
    }
}
