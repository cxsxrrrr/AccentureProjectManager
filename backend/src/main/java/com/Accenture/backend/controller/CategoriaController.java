package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.CategoriaDTO;
import com.Accenture.backend.domain.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // Crear Categoria
    @PostMapping
    public ResponseEntity<CategoriaDTO> createCategory(@RequestBody CategoriaDTO dto) {
        CategoriaDTO created = categoriaService.crearCategoria(dto);
        return ResponseEntity.ok(created);
    }

    // Obtener todas las Categorias
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> getAllCategories() {
        List<CategoriaDTO> list = categoriaService.listarCategorias();
        return ResponseEntity.ok(list);
    }

    // Actualizar Categoria por ID
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoriaDTO dto) {
        CategoriaDTO updated = categoriaService.actualizarCategoriaxId(id, dto);
        return ResponseEntity.ok(updated);
    }

    // Eliminar Categoria por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok("Categoria eliminada exitosamente");
    }
}
