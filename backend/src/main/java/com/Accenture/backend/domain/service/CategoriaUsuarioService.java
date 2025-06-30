package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.CategoriaUsuarioDAO;
import com.Accenture.backend.model.CategoriaUsuario;
import com.Accenture.backend.util.CategoriaMapper;
import com.Accenture.backend.domain.dto.CategoriaDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaUsuarioService {
    private final CategoriaUsuarioDAO categoriaUsuarioDAO;
    private final CategoriaMapper categoriaMapper;

    public CategoriaUsuarioService(CategoriaUsuarioDAO categoriaUsuarioDAO,
                                 CategoriaMapper categoriaMapper) {
        this.categoriaUsuarioDAO = categoriaUsuarioDAO;
        this.categoriaMapper = categoriaMapper;
    }

    // Asociar una categoría a un usuario
    public void asociarCategoriaAUsuario(Long usuarioId, Long categoriaId) {
        categoriaUsuarioDAO.asociarCategoriaAUsuario(usuarioId, categoriaId);
    }

    // Remover la asociación
    public void removerCategoriaAUsuario(Long usuarioId, Long categoriaId) {
        categoriaUsuarioDAO.removerCategoriaAUsuario(usuarioId, categoriaId);
    }

    /**
     * Listar todas las asociaciones de categorías para un usuario dado
     */
    public List<CategoriaUsuario> listarPorUsuarioId(Long usuarioId) {
        return categoriaUsuarioDAO.listarPorUsuarioId(usuarioId);
    }

    /**
     * Listar categorías asociadas a un usuario con detalle
     */
    public List<CategoriaDTO> listarCategoriasPorUsuario(Long usuarioId) {
        return categoriaUsuarioDAO.listarPorUsuarioId(usuarioId).stream()
            .map(cu -> categoriaMapper.toDTO(cu.getCategoria()))
            .collect(Collectors.toList());
    }
}