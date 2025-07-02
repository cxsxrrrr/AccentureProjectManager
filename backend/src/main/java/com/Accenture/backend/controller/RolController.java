package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.RolDTO;
import com.Accenture.backend.domain.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolService rolService;

    @PostMapping
    public ResponseEntity<RolDTO> crearRol(@RequestBody RolDTO rolDTO) {
        RolDTO creado = rolService.guardarRol(rolDTO);
        return ResponseEntity.ok(creado);
    }

    @GetMapping
    public ResponseEntity<List<RolDTO>> listarRoles() {
        return ResponseEntity.ok(rolService.listarRoles());
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<RolDTO> obtenerPorNombre(@PathVariable String nombre) {
        return rolService.buscarPorNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolDTO> actualizarRol(@PathVariable Long id, @RequestBody RolDTO rolDTO) {
        rolDTO.setId(id);
        RolDTO actualizado = rolService.actualizarRol(rolDTO);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RolDTO> patchRol(@PathVariable Long id, @RequestBody RolDTO rolDTO) {
        // Buscar el rol existente
        return rolService.buscarPorId(id)
                .map(existing -> {
                    // Solo actualiza los campos presentes en el body
                    if (rolDTO.getNombre() != null) existing.setNombre(rolDTO.getNombre());
                    if (rolDTO.getEstado() != null) existing.setEstado(rolDTO.getEstado());
                    if (rolDTO.getDescripcion() != null) existing.setDescripcion(rolDTO.getDescripcion());
                    RolDTO actualizado = rolService.actualizarRol(existing);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
