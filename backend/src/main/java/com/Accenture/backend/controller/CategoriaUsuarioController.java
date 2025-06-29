package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.CategoriaUsuarioDTO;
import com.Accenture.backend.domain.service.CategoriaUsuarioService;
import com.Accenture.backend.model.CategoriaUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = {"/api/category/user", "/api/category"})
public class CategoriaUsuarioController {
    private final CategoriaUsuarioService categoriaUsuarioService;

    public CategoriaUsuarioController(CategoriaUsuarioService categoriaUsuarioService) {
        this.categoriaUsuarioService = categoriaUsuarioService;
    }

    // Asociar categoría a usuario
    @PostMapping("/asociar")
    public ResponseEntity<String> asociarCategoriaAUsuario(@RequestBody CategoriaUsuarioDTO dto) {
        try {
            categoriaUsuarioService.asociarCategoriaAUsuario(dto.getUsuarioId(), dto.getCategoriaId());
            return ResponseEntity.ok("Categoría asociada al usuario correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Remover categoría de usuario
    @DeleteMapping("/remover")
    public ResponseEntity<String> removerCategoriaAUsuario(@RequestBody CategoriaUsuarioDTO dto) {
        categoriaUsuarioService.removerCategoriaAUsuario(dto.getUsuarioId(), dto.getCategoriaId());
        return ResponseEntity.ok("Categoría removida del usuario correctamente");
    }

    /**
     * Listar categorías asociadas a un usuario
     */
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<CategoriaUsuarioDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        List<CategoriaUsuarioDTO> dtos = new ArrayList<>();
        for (CategoriaUsuario cu : categoriaUsuarioService.listarPorUsuarioId(usuarioId)) {
            dtos.add(
                CategoriaUsuarioDTO.builder()
                    .usuarioId(cu.getUsuario().getUsuarioId())
                    .categoriaId(cu.getCategoria().getCategoriaId())
                    .experiencia(null)
                    .build()
            );
        }
        return ResponseEntity.ok(dtos);
    }
}
