package com.Accenture.backend.domain.service;


import com.Accenture.backend.dao.CategoriaDAO;
import com.Accenture.backend.domain.dto.CategoriaDTO;
import com.Accenture.backend.domain.repository.CategoriaRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.Categoria;
import com.Accenture.backend.util.CategoriaMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    private CategoriaDAO categoriaDAO;
    private CategoriaMapper categoriaMapper;
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaDAO categoriaDAO, CategoriaMapper categoriaMapper, CategoriaRepository categoriaRepository) {
        this.categoriaDAO = categoriaDAO;
        this.categoriaMapper = categoriaMapper;
        this.categoriaRepository = categoriaRepository;
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

}
