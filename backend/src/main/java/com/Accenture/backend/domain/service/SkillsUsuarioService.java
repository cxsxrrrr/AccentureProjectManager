package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.SkillsUsuarioDAO;
import org.springframework.stereotype.Service;

@Service
public class SkillsUsuarioService {
    private final SkillsUsuarioDAO skillsUsuarioDAO;

    public SkillsUsuarioService(SkillsUsuarioDAO skillsUsuarioDAO) {
        this.skillsUsuarioDAO = skillsUsuarioDAO;
    }

    // Asociar una categoría a un usuario
    public void asociarSkillAUsuario(Long usuarioId, Long skillId) {
        skillsUsuarioDAO.asociarSkillAUsuario(usuarioId, skillId);
    }

    // Remover la asociación
    public void removerSkillAUsuario(Long usuarioId, Long skillId) {
        skillsUsuarioDAO.removerSkillAUsuario(usuarioId, skillId);
    }
}
