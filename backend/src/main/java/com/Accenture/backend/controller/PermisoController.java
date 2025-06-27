package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.PermisoDTO;
import com.Accenture.backend.domain.service.PermisoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permisos")
public class PermisoController {

    @Autowired
    private PermisoService permisoService;

    // Crear o actualizar un permiso
    @PostMapping
    public ResponseEntity<PermisoDTO> crearPermiso(@RequestBody PermisoDTO permisoDTO) {
        PermisoDTO creado = permisoService.guardar(permisoDTO);
        return ResponseEntity.ok(creado);
    }

    // Listar todos los permisos
    @GetMapping
    public ResponseEntity<List<PermisoDTO>> listarPermisos() {
        return ResponseEntity.ok(permisoService.listarTodos());
    }

    // Buscar permiso por nombre
    @GetMapping("/{nombre}")
    public ResponseEntity<PermisoDTO> obtenerPorNombre(@PathVariable String nombre) {
        return permisoService.obtenerPorNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un permiso por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPermiso(@PathVariable Long id) {
        permisoService.eliminarPorId(id);
        return ResponseEntity.noContent().build();
    }
}
