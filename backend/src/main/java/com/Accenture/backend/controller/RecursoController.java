package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.RecursoDTO;
import com.Accenture.backend.domain.service.RecursoService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import java.util.List;

// Ruta principal para obtener info de recursos
@RestController
@RequestMapping("/api/recursos")
public class RecursoController {
    private final RecursoService recursoService;

    public RecursoController(RecursoService recursoService) {
        this.recursoService = recursoService;
    }

    // Crear Recurso
    @PostMapping
    public ResponseEntity<RecursoDTO> createRecurso(@RequestBody RecursoDTO recursoDTO) {
        RecursoDTO recursoGuardado = recursoService.crearRecurso(recursoDTO);
        return ResponseEntity.ok(recursoGuardado);
    }

    // Obtener todos los Recursos
    @GetMapping
    public ResponseEntity<List<RecursoDTO>> getAllRecursos() {
        List<RecursoDTO> recursos = (List<RecursoDTO>) recursoService.obtenerTodosLosRecursos();
        return ResponseEntity.ok(recursos);
    }

    // Eliminar Recurso por Id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecurso(@PathVariable("id") Long recursoId) {
        recursoService.eliminarRecursoxId(recursoId);
        return ResponseEntity.ok("Recurso eliminado exitosamente");
    }

    // Obtener Recurso por Id
    @GetMapping("/{id}")
    public ResponseEntity<RecursoDTO> getRecursoById(@PathVariable("id") Long recursoId) {
        RecursoDTO recurso = recursoService.obtenerRecursoxId(recursoId);
        return ResponseEntity.ok(recurso);
    }

    // Actualizar Recurso por Id
    @PutMapping("/{id}")
    public ResponseEntity<RecursoDTO> updateRecursoById(
            @PathVariable Long id,
            @RequestBody RecursoDTO recursoDTO) {

        RecursoDTO actualizado = recursoService.actualizarRecursoxId(id, recursoDTO);
        return ResponseEntity.ok(actualizado);
    }

    // Actualización parcial de recurso por ID (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<RecursoDTO> patchRecursoById(
            @PathVariable Long id,
            @RequestBody RecursoDTO recursoDTO) {
        RecursoDTO actualizado = recursoService.patchRecursoxId(id, recursoDTO);
        return ResponseEntity.ok(actualizado);
    }

}