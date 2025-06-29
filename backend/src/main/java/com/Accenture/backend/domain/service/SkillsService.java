package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.SkillsDAO;
import com.Accenture.backend.domain.dto.SkillsDTO;
import com.Accenture.backend.model.Skills;
import com.Accenture.backend.util.SkillsMapper;
import com.Accenture.backend.domain.repository.SkillsRepository;
import com.Accenture.backend.domain.repository.CategoriaRepository;
import com.Accenture.backend.model.Categoria;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.domain.repository.SkillsUsuarioRepository;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.util.UsuarioMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillsService {

    private final SkillsDAO skillsDAO;
    private final SkillsRepository skillsRepository;
    private final SkillsMapper skillsMapper;
    private final CategoriaRepository categoriaRepository;
    private final SkillsUsuarioRepository skillsUsuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public SkillsService(SkillsDAO skillsDAO,
                         SkillsRepository skillsRepository,
                         SkillsMapper skillsMapper,
                         CategoriaRepository categoriaRepository,
                         SkillsUsuarioRepository skillsUsuarioRepository,
                         UsuarioMapper usuarioMapper) {
        this.skillsDAO = skillsDAO;
        this.skillsRepository = skillsRepository;
        this.skillsMapper = skillsMapper;
        this.categoriaRepository = categoriaRepository;
        this.skillsUsuarioRepository = skillsUsuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    // Crear Skill
    public SkillsDTO crearSkill(SkillsDTO dto) {
        Skills entity = skillsMapper.toEntity(dto);
        entity.setSkillId(null);
        // Validate categoriaId exists
        Long catId = dto.getCategoriaId();
        Categoria categoria = categoriaRepository.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + catId));
        entity.setCategoria(categoria);
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
        // Validate and update categoria if provided
        if (dto.getCategoriaId() != null) {
            Long catId = dto.getCategoriaId();
            Categoria categoria = categoriaRepository.findById(catId)
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + catId));
            existing.setCategoria(categoria);
        }
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

    // Obtener usuarios por Skill
    public List<UsuarioDTO> obtenerUsuariosPorSkill(Long skillId) {
        return skillsUsuarioRepository.findAllBySkill_SkillId(skillId).stream()
                .map(su -> usuarioMapper.toDTO(su.getUsuario()))
                .collect(Collectors.toList());
    }

    /**
     * Obtener Skills asociadas a un usuario
     */
    public List<SkillsDTO> obtenerSkillsPorUsuario(Long usuarioId) {
        return skillsUsuarioRepository.findAllByUsuario_UsuarioId(usuarioId).stream()
            .map(su -> skillsMapper.toDTO(su.getSkill()))
            .collect(Collectors.toList());
    }
}
