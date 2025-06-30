package com.Accenture.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.Accenture.backend.domain.dto.VersionesDocumentosDTO;
import com.Accenture.backend.domain.service.VersionesDocumentosService;

@RestController
@RequestMapping("/api/versiones-documentos")
public class VersionesDocumentosController {
    private final VersionesDocumentosService service;

    @Autowired
    public VersionesDocumentosController(VersionesDocumentosService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<VersionesDocumentosDTO> create(@RequestBody VersionesDocumentosDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<VersionesDocumentosDTO> result = service.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("La versión de documento con id " + id + " no existe.");
        }
    }

    @GetMapping
    public List<VersionesDocumentosDTO> getAll() {
        return service.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok("Versión de documento eliminada exitosamente.");
    }

    @GetMapping("/documento/{documentoId}")
    public List<VersionesDocumentosDTO> getByDocumento(@PathVariable Long documentoId) {
        return service.findByDocumentosId(documentoId);
    }

    @GetMapping("/tarea/{tareasId}")
    public List<VersionesDocumentosDTO> getByTarea(@PathVariable Long tareasId) {
        return service.findByTareasId(tareasId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<VersionesDocumentosDTO> getByUsuario(@PathVariable Long usuarioId) {
        return service.findBySubidoPor(usuarioId);
    }

    @GetMapping("/ultima/{documentoId}")
    public ResponseEntity<?> getUltimaVersion(@PathVariable Long documentoId) {
        VersionesDocumentosDTO dto = service.findUltimaVersionByDocumentoId(documentoId);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(404).body("No existe una última versión para el documento con id " + documentoId);
        }
    }

    @GetMapping("/estado/{estado}")
    public List<VersionesDocumentosDTO> getByEstado(@PathVariable String estado) {
        return service.findByEstado(estado);
    }
}
