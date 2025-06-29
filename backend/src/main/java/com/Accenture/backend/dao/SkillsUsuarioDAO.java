package com.Accenture.backend.dao;

public interface SkillsUsuarioDAO {
    void asociarSkillAUsuario(Long usuarioId, Long skillId);
    void removerSkillAUsuario(Long usuarioId, Long skillId);
}
