package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.SkillsUsuarioDTO;
import com.Accenture.backend.domain.service.SkillsUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skills/user")
public class SkillsUsuarioController {
    private final SkillsUsuarioService skillsUsuarioService;

    public SkillsUsuarioController(SkillsUsuarioService skillsUsuarioService) {
        this.skillsUsuarioService = skillsUsuarioService;
    }

    // Asociar skill a usuario
    @PostMapping("/asociar")
    public ResponseEntity<String> asociarSkillAUsuario(@RequestBody SkillsUsuarioDTO dto) {
        skillsUsuarioService.asociarSkillAUsuario(dto.getUsuarioId(), dto.getSkillId());
        return ResponseEntity.ok("Skill asociado al usuario correctamente");
    }

    // Remover categoría de usuario
    @DeleteMapping("/remover")
    public ResponseEntity<String> removerSkillAUsuario(@RequestBody SkillsUsuarioDTO dto) {
        skillsUsuarioService.removerSkillAUsuario(dto.getUsuarioId(), dto.getSkillId());
        return ResponseEntity.ok("Skill removido del usuario correctamente");
    }
}
