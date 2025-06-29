package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.Accenture.backend.domain.dto.DependenciaTareasDTO;
import com.Accenture.backend.domain.service.DependenciaTareasService;

@RestController
@RequestMapping("/api/dependencia-tareas")
public class DependenciaTareasController {
    private final DependenciaTareasService service;

    @Autowired
    public DependenciaTareasController(DependenciaTareasService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DependenciaTareasDTO> create(@RequestBody DependenciaTareasDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<DependenciaTareasDTO> result = service.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("La dependencia de tarea con id " + id + " no existe.");
        }
    }

    @GetMapping
    public List<DependenciaTareasDTO> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DependenciaTareasDTO> update(@PathVariable Long id, @RequestBody DependenciaTareasDTO dto) {
        dto.setDependenciaTareasId(id);
        DependenciaTareasDTO actualizado = service.update(dto);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok("Dependencia de tarea eliminada exitosamente.");
    }

    @GetMapping("/tarea/{tareaId}")
    public List<DependenciaTareasDTO> getByTarea(@PathVariable Long tareaId) {
        return service.findByTareaId(tareaId);
    }

    @GetMapping("/precedente/{tareaPresendenteId}")
    public List<DependenciaTareasDTO> getByTareaPresendente(@PathVariable Long tareaPresendenteId) {
        return service.findByTareaPresendente(tareaPresendenteId);
    }

    @GetMapping("/tipo/{tipoDependencia}")
    public List<DependenciaTareasDTO> getByTipo(@PathVariable String tipoDependencia) {
        return service.findByTipoDependencia(tipoDependencia);
    }
}
