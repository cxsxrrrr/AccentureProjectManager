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
}
