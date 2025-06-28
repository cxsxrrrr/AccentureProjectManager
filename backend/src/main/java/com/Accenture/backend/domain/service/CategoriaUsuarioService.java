package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.CategoriaUsuarioDAO;
import org.springframework.stereotype.Service;

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
}