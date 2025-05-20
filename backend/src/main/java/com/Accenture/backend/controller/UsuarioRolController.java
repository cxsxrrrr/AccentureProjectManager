package com.Accenture.backend.controller;

import com.Accenture.backend.model.UsuarioRol;
import com.Accenture.backend.domain.service.UsuarioRolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario-roles")
public class UsuarioRolController {

    private final UsuarioRolService usuarioRolService;

    public UsuarioRolController(UsuarioRolService usuarioRolService) {
        this.usuarioRolService = usuarioRolService;
    }

    // Obtener todas las relaciones usuario-rol
    @GetMapping
    public List<UsuarioRol> listarTodos() {
        return usuarioRolService.listarUsuarioRoles();
    }

    // Obtener una relación usuario-rol por su id
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioRol> obtenerPorId(@PathVariable Long id) {
        UsuarioRol usuarioRol = usuarioRolService.obtenerUsuarioRolPorId(id);
        if (usuarioRol != null) {
            return ResponseEntity.ok(usuarioRol);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Crear una nueva relación usuario-rol
    @PostMapping
    public UsuarioRol crearUsuarioRol(@RequestBody UsuarioRol usuarioRol) {
        return usuarioRolService.guardarUsuarioRol(usuarioRol);
    }

    // Actualizar una relación usuario-rol existente
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioRol> actualizarUsuarioRol(@PathVariable Long id, @RequestBody UsuarioRol usuarioRolActualizado) {
        UsuarioRol existente = usuarioRolService.obtenerUsuarioRolPorId(id);
        if (existente != null) {
            usuarioRolActualizado.setId(id);
            UsuarioRol actualizado = usuarioRolService.guardarUsuarioRol(usuarioRolActualizado);
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una relación usuario-rol por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuarioRol(@PathVariable Long id) {
        UsuarioRol existente = usuarioRolService.obtenerUsuarioRolPorId(id);
        if (existente != null) {
            usuarioRolService.eliminarUsuarioRol(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Obtener roles de un usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<UsuarioRol> obtenerRolesPorUsuario(@PathVariable Long usuarioId) {
        return usuarioRolService.obtenerRolesPorUsuario(usuarioId);
    }

    // Obtener usuarios de un rol
    @GetMapping("/rol/{rolId}")
    public List<UsuarioRol> obtenerUsuariosPorRol(@PathVariable Long rolId) {
        return usuarioRolService.obtenerUsuariosPorRol(rolId);
    }
}