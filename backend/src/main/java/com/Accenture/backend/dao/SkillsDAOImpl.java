package com.Accenture.backend.dao;

import com.Accenture.backend.domain.repository.SkillsRepository;
import com.Accenture.backend.model.Skills;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SkillsDAOImpl implements SkillsDAO {

    private final SkillsRepository skillRepository;

    // Constructor
    public SkillsDAOImpl(SkillsRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Transactional
    @Override
    public Skills guardarSkill(Skills skill) {
        return skillRepository.save(skill);
    }

    @Override
    public Skills actualizarSkill(Skills skill) {
        return skillRepository.save(skill);
    }

    @Override
    public void eliminarSkill(Skills skill) {
        skillRepository.delete(skill);
    }

    @Override
    public List<Skills> obtenerSkills() {
        return skillRepository.findAll();
    }


}
