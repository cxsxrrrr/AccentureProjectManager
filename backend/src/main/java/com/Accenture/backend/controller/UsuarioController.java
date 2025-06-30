package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.domain.service.UsuarioService;

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
import java.util.Map;

// Ruta principal
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    // POST Crear usuario
    @PostMapping
    public ResponseEntity<UsuarioDTO> createUser(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO proyectoGuardado = usuarioService.crearUsuario(usuarioDTO);
        return ResponseEntity.ok(proyectoGuardado);
    }
    // GET Usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getUserById(@PathVariable("id") Long usuarioId) {
        UsuarioDTO usuario = usuarioService.obtenerUsuarioxId(usuarioId);
        return ResponseEntity.ok(usuario);
    }

    // GET Todos los usuarios
    @GetMapping()
    public ResponseEntity<List<UsuarioDTO>> getAllUsers() {
        List<UsuarioDTO> usuarios = (List<UsuarioDTO>) usuarioService.obtenerUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // Borrar Usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long usuarioId) {
        usuarioService.eliminarUsuario(usuarioId);
        return ResponseEntity.ok("Usuario eliminado exitosamente");
    }

    // Actualizar Usuario por ID
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> updateUserById(
            @PathVariable Long id,
            @RequestBody UsuarioDTO usuarioDTO) {

        UsuarioDTO actualizado = usuarioService.actualizarUsuarioxId(id, usuarioDTO);
        return ResponseEntity.ok(actualizado);
    }

    // Endpoint para login (maneja intentos fallidos)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO loginDTO) {
        try {
            UsuarioDTO usuario = usuarioService.login(loginDTO.getEmail(), loginDTO.getPassword());
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // Buscar Usuario por cédula
    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<UsuarioDTO> getUserByCedula(@PathVariable("cedula") Long cedula) {
        UsuarioDTO usuario = usuarioService.obtenerUsuarioPorCedula(cedula);
        return ResponseEntity.ok(usuario);
    }

    // PATCH: Actualizar solo campos parciales del usuario
    @PatchMapping("/{id}")
    public ResponseEntity<UsuarioDTO> patchUserById(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {
        UsuarioDTO actualizado = usuarioService.patchUsuarioById(id, updates);
        return ResponseEntity.ok(actualizado);
    }

}
