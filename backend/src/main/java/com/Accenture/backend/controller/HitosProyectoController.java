package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.HitosProyectoDTO;
import com.Accenture.backend.domain.service.HitosProyectoService;
import com.Accenture.backend.model.HitosProyecto;
import com.Accenture.backend.util.HitosProyectoMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

// Ruta principal
@RestController
@RequestMapping("/api/hitos")
public class HitosProyectoController {
    private final HitosProyectoService hitoService;
    private final HitosProyectoMapper hitoMapper;

    public HitosProyectoController(HitosProyectoService hitoService, HitosProyectoMapper hitoMapper) {
        this.hitoService = hitoService;
        this.hitoMapper = hitoMapper;
    }

    // POST Crear hito
    @PostMapping
    public ResponseEntity<HitosProyectoDTO> createMilestone(@RequestBody HitosProyectoDTO hitoDTO) {
        HitosProyectoDTO hitoGuardado = hitoService.crearHito(hitoDTO);
        return ResponseEntity.ok(hitoGuardado);
    }

    // GET Hitos por proyecto
    @GetMapping("/{proyectoId}")
    public ResponseEntity<List<HitosProyectoDTO>> getHitosByProyecto(@PathVariable Long proyectoId) {
        List<HitosProyectoDTO> hitos = hitoService.obtenerHitosPorProyecto(proyectoId);
        return ResponseEntity.ok(hitos);
    }

    // PUT Actualizar hito
    @PutMapping
    public ResponseEntity<HitosProyectoDTO> updateMilestone(@RequestBody HitosProyectoDTO hitoDTO) {
        HitosProyecto hito = hitoMapper.toEntity(hitoDTO);
        HitosProyecto actualizado = hitoService.actualizarHito(hito);
        return ResponseEntity.ok(hitoMapper.toDTO(actualizado));
    }

    // DELETE Eliminar hito
    @DeleteMapping
    public ResponseEntity<String> deleteMilestone(@RequestBody HitosProyectoDTO hitoDTO) {
        HitosProyecto hito = hitoMapper.toEntity(hitoDTO);
        hitoService.eliminarHito(hito);
        return ResponseEntity.ok("Hito eliminado exitosamente");
    }

    // DELETE Eliminar hito por ID
    @DeleteMapping("/{hitoId}")
    public ResponseEntity<String> deleteMilestoneById(@PathVariable Long hitoId) {
        hitoService.eliminarHitoById(hitoId);
        return ResponseEntity.ok("Hito eliminado exitosamente");
    }


}
