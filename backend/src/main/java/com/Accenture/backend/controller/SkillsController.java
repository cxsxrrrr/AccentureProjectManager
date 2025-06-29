package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.SkillsDTO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.domain.service.SkillsService;
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
@RequestMapping("/api/skills")
public class SkillsController {
    private final SkillsService skillsService;

    public SkillsController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    // Obtener usuarios asociados a una skill
    @GetMapping("/{id}/users")
    public ResponseEntity<List<UsuarioDTO>> getUsersBySkill(@PathVariable("id") Long id) {
        List<UsuarioDTO> users = skillsService.obtenerUsuariosPorSkill(id);
        return ResponseEntity.ok(users);
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

    // Obtener Skills asociadas a un usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SkillsDTO>> getSkillsByUsuario(@PathVariable("usuarioId") Long usuarioId) {
        List<SkillsDTO> skills = skillsService.obtenerSkillsPorUsuario(usuarioId);
        return ResponseEntity.ok(skills);
    }
}
