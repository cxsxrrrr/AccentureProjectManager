package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.CategoriaDTO;
import com.Accenture.backend.domain.dto.CategoriaUsuarioDTO;
import com.Accenture.backend.domain.service.CategoriaUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category/user")
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
     * Obtener categorías asociadas al usuario (solo detalles de categoría)
     */
    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<CategoriaDTO>> listarCategoriasUsuario(@PathVariable Long usuarioId) {
        List<CategoriaDTO> categorias = categoriaUsuarioService.listarCategoriasPorUsuario(usuarioId);
        return ResponseEntity.ok(categorias);
    }
}
