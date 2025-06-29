package com.Accenture.backend.domain.service;


import com.Accenture.backend.dao.CategoriaDAO;
import com.Accenture.backend.domain.dto.CategoriaDTO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.domain.repository.CategoriaRepository;
import com.Accenture.backend.domain.repository.CategoriaUsuarioRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.Categoria;
import com.Accenture.backend.util.CategoriaMapper;
import com.Accenture.backend.util.UsuarioMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    private final CategoriaDAO categoriaDAO;
    private final CategoriaMapper categoriaMapper;
    private final CategoriaRepository categoriaRepository;
    private final CategoriaUsuarioRepository categoriaUsuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public CategoriaService(CategoriaDAO categoriaDAO,
                             CategoriaMapper categoriaMapper,
                             CategoriaRepository categoriaRepository,
                             CategoriaUsuarioRepository categoriaUsuarioRepository,
                             UsuarioMapper usuarioMapper) {
        this.categoriaDAO = categoriaDAO;
        this.categoriaMapper = categoriaMapper;
        this.categoriaRepository = categoriaRepository;
        this.categoriaUsuarioRepository = categoriaUsuarioRepository;
        this.usuarioMapper = usuarioMapper;
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
}
