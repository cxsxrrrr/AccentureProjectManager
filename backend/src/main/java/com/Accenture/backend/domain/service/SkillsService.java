package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.SkillsDAO;
import com.Accenture.backend.domain.dto.SkillsDTO;
import com.Accenture.backend.model.Skills;
import com.Accenture.backend.util.SkillsMapper;
import com.Accenture.backend.domain.repository.SkillsRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillsService {

    private final SkillsDAO skillsDAO;
    private final SkillsRepository skillsRepository;
    private final SkillsMapper skillsMapper;

    public SkillsService(SkillsDAO skillsDAO,
                         SkillsRepository skillsRepository,
                         SkillsMapper skillsMapper) {
        this.skillsDAO = skillsDAO;
        this.skillsRepository = skillsRepository;
        this.skillsMapper = skillsMapper;
    }

    // Crear Skill
    public SkillsDTO crearSkill(SkillsDTO dto) {
        Skills entity = skillsMapper.toEntity(dto);
        // Reset ID to null so that JPA generates a new identity value
        entity.setSkillId(null);
        Skills saved = skillsDAO.guardarSkill(entity);
        return skillsMapper.toDTO(saved);
    }

    // Obtener todas las Skills
    public List<SkillsDTO> obtenerSkills() {
        return skillsDAO.obtenerSkills().stream()
                .map(skillsMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Actualizar Skill por ID
    public SkillsDTO actualizarSkillById(Long id, SkillsDTO dto) {
        Skills existing = skillsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill no encontrado"));
        skillsMapper.updateSkillsFromDto(dto, existing);
        existing.setSkillId(id);
        Skills saved = skillsDAO.actualizarSkill(existing);
        return skillsMapper.toDTO(saved);
    }

    // Eliminar Skill por ID
    public void eliminarSkillById(Long id) {
        Skills existing = skillsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill no encontrado"));
        skillsDAO.eliminarSkill(existing);
    }
}
