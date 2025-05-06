package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.domain.service.ProyectoService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;

// Ruta principal
@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {
    private final ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    // Crear Proyecto
    @PostMapping
    public ResponseEntity<ProyectoDTO> createProject(@RequestBody ProyectoDTO proyectoDTO) {
        ProyectoDTO proyectoGuardado = proyectoService.crearProyecto(proyectoDTO);
        return ResponseEntity.ok(proyectoGuardado);
    }

    // Obtener todos los Proyectos
    @GetMapping
    public ResponseEntity<List<ProyectoDTO>> getAllProyectos() {
        List<ProyectoDTO> proyectos = (List<ProyectoDTO>) proyectoService.obtenerTodosLosProyectos();
        return ResponseEntity.ok(proyectos);
    }

    // Eliminar Proyecto por Id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProyecto(@PathVariable("id") Long proyectoId) {
        proyectoService.eliminarProyectoxId(proyectoId);
        return ResponseEntity.ok("Proyecto eliminado exitosamente");
    }

    // Obtener Proyecto por Id
    @GetMapping("/{id}")
    public ResponseEntity<ProyectoDTO> getProyectoById(@PathVariable("id") Long proyectoId) {
       ProyectoDTO proyecto = proyectoService.obtenerProyectoxId(proyectoId);
        return ResponseEntity.ok(proyecto);
    }

    // Actualizar Proyecto por Id
    @PutMapping("/{id}")
    public ResponseEntity<ProyectoDTO> updateProyectoById(
            @PathVariable Long id,
            @RequestBody ProyectoDTO proyectoDTO) {

        ProyectoDTO actualizado = proyectoService.actualizarProyectoxId(id, proyectoDTO);
        return ResponseEntity.ok(actualizado);
    }

}
