package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.SkillsDTO;
import com.Accenture.backend.domain.service.SkillsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {
    private final SkillsService skillsService;

    public SkillsController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    // Crear Skill
    @PostMapping
    public ResponseEntity<SkillsDTO> createSkill(@RequestBody SkillsDTO dto) {
        SkillsDTO created = skillsService.crearSkill(dto);
        return ResponseEntity.ok(created);
    }

    // Obtener todas las Skills
    @GetMapping
    public ResponseEntity<List<SkillsDTO>> getAllSkills() {
        List<SkillsDTO> list = skillsService.obtenerSkills();
        return ResponseEntity.ok(list);
    }

    // Actualizar Skill por ID
    @PutMapping("/{id}")
    public ResponseEntity<SkillsDTO> updateSkill(
            @PathVariable Long id,
            @RequestBody SkillsDTO dto) {
        SkillsDTO updated = skillsService.actualizarSkillById(id, dto);
        return ResponseEntity.ok(updated);
    }

    // Eliminar Skill por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long id) {
        skillsService.eliminarSkillById(id);
        return ResponseEntity.ok("Skill eliminado exitosamente");
    }
}
