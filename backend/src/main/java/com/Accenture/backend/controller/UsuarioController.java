package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.domain.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> createUser(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO proyectoGuardado = usuarioService.crearUsuario(usuarioDTO);
        return ResponseEntity.ok(proyectoGuardado);
    }

}
