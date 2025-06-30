package com.Accenture.backend.dao;

import java.util.List;
import com.Accenture.backend.model.SkillsUsuario;

public interface SkillsUsuarioDAO {
    void asociarSkillAUsuario(Long usuarioId, Long skillId);
    void removerSkillAUsuario(Long usuarioId, Long skillId);
    List<SkillsUsuario> listarPorUsuarioId(Long usuarioId);
}
