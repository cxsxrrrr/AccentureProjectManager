package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.CategoriaUsuario;
import com.Accenture.backend.model.SkillsUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillsUsuarioRepository extends JpaRepository<SkillsUsuario, Long> {
    Optional<SkillsUsuario> findByUsuario_UsuarioIdAndSkill_SkillId(
            Long usuarioId,
            Long categoriaId
    );

    List<SkillsUsuario> findAllBySkill_SkillId(Long skillId);
}
