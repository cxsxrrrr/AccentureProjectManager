package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.Accenture.backend.domain.dto.DocumentosDTO;
import com.Accenture.backend.domain.service.DocumentosService;

@RestController
@RequestMapping("/api/documentos")
public class DocumentosController {
    private final DocumentosService documentosService;

    @Autowired
    public DocumentosController(DocumentosService documentosService) {
        this.documentosService = documentosService;
    }

    @PostMapping
    public ResponseEntity<DocumentosDTO> create(@RequestBody DocumentosDTO dto) {
        return ResponseEntity.ok(documentosService.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<DocumentosDTO> result = documentosService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("El documento con id " + id + " no existe.");
        }
    }

    @GetMapping
    public List<DocumentosDTO> getAll() {
        return documentosService.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        documentosService.deleteById(id);
        return ResponseEntity.ok("Documento eliminado exitosamente.");
    }

    @GetMapping("/proyecto/{proyectoId}")
    public List<DocumentosDTO> getByProyecto(@PathVariable Long proyectoId) {
        return documentosService.findByProyectoId(proyectoId);
    }

    @GetMapping("/nombre/{nombre}")
    public List<DocumentosDTO> getByNombre(@PathVariable String nombre) {
        return documentosService.findByNombreOriginal(nombre);
    }

    @GetMapping("/buscar")
    public List<DocumentosDTO> searchByNombre(@RequestParam String nombre) {
        return documentosService.findByNombreOriginalContainingIgnoreCase(nombre);
    }
}
