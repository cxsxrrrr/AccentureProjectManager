package com.Accenture.backend.domain.service;


import com.Accenture.backend.dao.CategoriaDAO;
import com.Accenture.backend.domain.dto.CategoriaDTO;
import com.Accenture.backend.domain.dto.CategoryUsersResponseDTO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.domain.repository.CategoriaRepository;
import com.Accenture.backend.domain.repository.CategoriaUsuarioRepository;
import com.Accenture.backend.domain.repository.SkillsRepository;
import com.Accenture.backend.domain.repository.SkillsUsuarioRepository;
import com.Accenture.backend.domain.repository.ProyectoCategoriaRepository;
import com.Accenture.backend.model.ProyectoCategoria;
import com.Accenture.backend.model.Skills;
import com.Accenture.backend.model.SkillsUsuario;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.Categoria;
import com.Accenture.backend.util.CategoriaMapper;
import com.Accenture.backend.util.UsuarioMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    private final SkillsRepository skillsRepository;
    private final SkillsUsuarioRepository skillsUsuarioRepository;
    private final ProyectoCategoriaRepository proyectoCategoriaRepository;
    private final CategoriaDAO categoriaDAO;
    private final CategoriaMapper categoriaMapper;
    private final CategoriaRepository categoriaRepository;
    private final CategoriaUsuarioRepository categoriaUsuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public CategoriaService(CategoriaDAO categoriaDAO,
                             CategoriaMapper categoriaMapper,
                             CategoriaRepository categoriaRepository,
                             CategoriaUsuarioRepository categoriaUsuarioRepository,
                             UsuarioMapper usuarioMapper,
                             SkillsRepository skillsRepository,
                             SkillsUsuarioRepository skillsUsuarioRepository,
                             ProyectoCategoriaRepository proyectoCategoriaRepository) {
        this.categoriaDAO = categoriaDAO;
        this.categoriaMapper = categoriaMapper;
        this.categoriaRepository = categoriaRepository;
        this.categoriaUsuarioRepository = categoriaUsuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.skillsRepository = skillsRepository;
        this.skillsUsuarioRepository = skillsUsuarioRepository;
        this.proyectoCategoriaRepository = proyectoCategoriaRepository;
    }

    public CategoriaDTO crearCategoria(CategoriaDTO dto){

        // Convertimos la categoria a Entidad
        Categoria categoria = categoriaMapper.toEntity(dto);
        // Guardamos la categoria
        categoria = categoriaDAO.crearCategoria(categoria);
        // Retornamos el DTO
        return categoriaMapper.toDTO(categoria);

    }

    public List<CategoriaDTO> listarCategorias(){
        return categoriaDAO.listarCategorias().stream()
                .map(categoriaMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void eliminarCategoria(Long categoriaId){
        Categoria existing = categoriaDAO.buscarCategoriaPorId(categoriaId)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));

        // Eliminar asociaciones en CategoriaUsuario
        List<com.Accenture.backend.model.CategoriaUsuario> catUsuarios = categoriaUsuarioRepository.findAllByCategoria_CategoriaId(categoriaId);
        if (catUsuarios != null && !catUsuarios.isEmpty()) {
            categoriaUsuarioRepository.deleteAll(catUsuarios);
        }

        // Eliminar asociaciones en ProyectoCategoria (sin borrar proyectos)
        List<ProyectoCategoria> proyectoCategorias = proyectoCategoriaRepository.findByCategoria_CategoriaId(categoriaId);
        if (proyectoCategorias != null && !proyectoCategorias.isEmpty()) {
            proyectoCategoriaRepository.deleteAll(proyectoCategorias);
        }

        // Eliminar skills asociadas a la categoría (y sus asociaciones)
        List<Skills> skills = skillsRepository.findAll().stream()
            .filter(s -> s.getCategoria() != null && s.getCategoria().getCategoriaId().equals(categoriaId))
            .collect(java.util.stream.Collectors.toList());
        if (skills != null && !skills.isEmpty()) {
            for (Skills skill : skills) {
                List<SkillsUsuario> asociaciones = skillsUsuarioRepository.findAllBySkill_SkillId(skill.getSkillId());
                if (asociaciones != null && !asociaciones.isEmpty()) {
                    skillsUsuarioRepository.deleteAll(asociaciones);
                }
                skillsRepository.delete(skill);
            }
        }

        categoriaDAO.eliminarCategoria(existing);
    }

    public CategoriaDTO actualizarCategoriaxId(Long id, CategoriaDTO dto) {
        Categoria existing = categoriaDAO.buscarCategoriaPorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
        categoriaMapper.updateCategoriaFromDto(dto, existing);
        existing.setCategoriaId(id);
        Categoria saved = categoriaDAO.modificarCategoria(existing);
        return categoriaMapper.toDTO(saved);
    }
    
    // Obtener usuarios por Categoria
    public List<UsuarioDTO> listarUsuariosPorCategoria(Long categoriaId) {
        return categoriaUsuarioRepository.findAllByCategoria_CategoriaId(categoriaId).stream()
                .map(cu -> usuarioMapper.toDTO(cu.getUsuario()))
                .collect(Collectors.toList());
    }

    /**
     * Obtener Categoria por ID
     */
    public CategoriaDTO obtenerCategoriaPorId(Long id) {
        Categoria categoria = categoriaDAO.buscarCategoriaPorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + id));
        return categoriaMapper.toDTO(categoria);
    }

    /**
     * Listar usuarios junto a info de categoría
     */
    public CategoryUsersResponseDTO obtenerUsuariosCategoria(Long categoriaId) {
        Categoria categoria = categoriaDAO.buscarCategoriaPorId(categoriaId)
            .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + categoriaId));
        List<UsuarioDTO> users = listarUsuariosPorCategoria(categoriaId);
        return CategoryUsersResponseDTO.builder()
            .categoriaId(categoria.getCategoriaId())
            .nombre(categoria.getNombre())
            .usuarios(users)
            .build();
    }
}
