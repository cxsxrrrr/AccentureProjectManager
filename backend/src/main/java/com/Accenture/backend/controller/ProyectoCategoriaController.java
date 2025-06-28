package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.ProyectoCategoriaDTO;
import com.Accenture.backend.domain.service.ProyectoCategoriaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos-categorias")
public class ProyectoCategoriaController {

    private final ProyectoCategoriaService proyectoCategoriaService;

    public ProyectoCategoriaController(ProyectoCategoriaService proyectoCategoriaService) {
        this.proyectoCategoriaService = proyectoCategoriaService;
    }

    // POST: Asociar una categoría a un proyecto
    @PostMapping("/asociar")
    public ResponseEntity<String> asociarCategoriaAProyecto(
            @RequestParam Long proyectoId,
            @RequestParam Long categoriaId) {
        proyectoCategoriaService.agregarCategoriaAProyecto(proyectoId, categoriaId);
        return ResponseEntity.ok("Categoría asociada al proyecto correctamente");
    }

    // DELETE: Eliminar una asociación proyecto-categoría
    @DeleteMapping("/eliminar")
    public ResponseEntity<String> eliminarCategoriaDeProyecto(
            @RequestParam Long proyectoId,
            @RequestParam Long categoriaId) {
        proyectoCategoriaService.eliminarCategoriaDeProyecto(proyectoId, categoriaId);
        return ResponseEntity.ok("Categoría eliminada del proyecto correctamente");
    }

    // GET: Categorías por proyecto
    @GetMapping("/por-proyecto/{proyectoId}")
    public ResponseEntity<List<ProyectoCategoriaDTO>> getCategoriasByProyecto(
            @PathVariable Long proyectoId) {
        List<ProyectoCategoriaDTO> lista = proyectoCategoriaService.obtenerCategoriasPorProyecto(proyectoId);
        return ResponseEntity.ok(lista);
    }

    // GET: Proyectos por categoría
    @GetMapping("/por-categoria/{categoriaId}")
    public ResponseEntity<List<ProyectoCategoriaDTO>> getProyectosByCategoria(
            @PathVariable Long categoriaId) {
        List<ProyectoCategoriaDTO> lista = proyectoCategoriaService.obtenerProyectosPorCategoria(categoriaId);
        return ResponseEntity.ok(lista);
    }
}
