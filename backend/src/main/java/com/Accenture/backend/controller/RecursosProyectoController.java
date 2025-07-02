package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.Accenture.backend.domain.dto.RecursosProyectoDTO;
import com.Accenture.backend.domain.dto.RecursosProyectoSimpleDTO;
import com.Accenture.backend.domain.dto.RecursosProyectoUltraSimpleDTO;
import com.Accenture.backend.domain.dto.RecursosProyectoCreateDTO;
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
        try {
            return ResponseEntity.ok(service.save(dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
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

    @GetMapping("/simple")
    public List<RecursosProyectoSimpleDTO> getAllSimple() {
        return service.findAllSimple();
    }

    @GetMapping("/proyecto/{proyectoId}/simple")
    public List<RecursosProyectoSimpleDTO> getByProyectoSimple(@PathVariable Long proyectoId) {
        return service.findByProyectoIdSimple(proyectoId);
    }

    @GetMapping("/ultrasimple")
    public List<RecursosProyectoUltraSimpleDTO> getAllUltraSimple() {
        return service.findAllUltraSimple();
    }

    @GetMapping("/proyecto/{proyectoId}/ultrasimple")
    public List<RecursosProyectoUltraSimpleDTO> getByProyectoUltraSimple(@PathVariable Long proyectoId) {
        return service.findByProyectoIdUltraSimple(proyectoId);
    }
}
