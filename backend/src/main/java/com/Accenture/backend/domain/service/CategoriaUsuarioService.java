package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.CategoriaUsuarioDAO;
import com.Accenture.backend.model.CategoriaUsuario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaUsuarioService {
    private final CategoriaUsuarioDAO categoriaUsuarioDAO;

    public CategoriaUsuarioService(CategoriaUsuarioDAO categoriaUsuarioDAO) {
        this.categoriaUsuarioDAO = categoriaUsuarioDAO;
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
}