package com.Accenture.backend.dao;

import com.Accenture.backend.domain.repository.SkillsUsuarioRepository;
import com.Accenture.backend.model.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class SkillsUsuarioDAOImpl implements SkillsUsuarioDAO {

    private final SkillsUsuarioRepository skillsUsuarioRepository;

    public SkillsUsuarioDAOImpl(SkillsUsuarioRepository skillsUsuarioRepository) {
        this.skillsUsuarioRepository = skillsUsuarioRepository;
    }

    @Transactional
    @Override
    public void asociarSkillAUsuario(Long usuarioId, Long skillId) {
        SkillsUsuario su = new SkillsUsuario();
        // Construyo solo proxies con el ID para no recargar entidad completa
        Usuario u = new Usuario(); u.setUsuarioId(usuarioId);
        Skills s = new Skills(); s.setSkillId(skillId);
        su.setUsuario(u);
        su.setSkill(s);
        // Si tienes campo experiencia lo puedes setear aquí
        skillsUsuarioRepository.save(su);
    }

    @Transactional
    @Override
    public void removerSkillAUsuario(Long usuarioId, Long skillId) {
        SkillsUsuario cu = skillsUsuarioRepository
                .findByUsuario_UsuarioIdAndSkill_SkillId(usuarioId, skillId)
                .orElseThrow(() -> new IllegalArgumentException("No existe esa asociación"));
        skillsUsuarioRepository.delete(cu);
    }
}
