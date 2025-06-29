package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.UsuarioRolDAO;
import com.Accenture.backend.model.UsuarioRol;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioRolService {

    private final UsuarioRolDAO usuarioRolDAO;

    public UsuarioRolService(UsuarioRolDAO usuarioRolDAO) {
        this.usuarioRolDAO = usuarioRolDAO;
    }

    // Guarda o actualiza una relación UsuarioRol (sin restricción de un solo rol por usuario)
    public UsuarioRol guardarUsuarioRol(UsuarioRol usuarioRol) {
        return usuarioRolDAO.guardarUsuarioRol(usuarioRol);
    }

    // Elimina una relación UsuarioRol
    public void eliminarUsuarioRol(Long id) {
        UsuarioRol usuarioRol = usuarioRolDAO.buscarUsuarioRolPorId(id);
        if (usuarioRol != null) {
            usuarioRolDAO.eliminarUsuarioRol(usuarioRol);
        }
    }

    // Busca una relación UsuarioRol por ID
    public UsuarioRol obtenerUsuarioRolPorId(Long id) {
        return usuarioRolDAO.buscarUsuarioRolPorId(id);
    }

    // Lista todas las relaciones UsuarioRol
    public List<UsuarioRol> listarUsuarioRoles() {
        return usuarioRolDAO.obtenerUsuarioRoles();
    }

    // Obtiene todas las relaciones de roles para un usuario dado
    public List<UsuarioRol> obtenerRolesPorUsuario(Long usuarioId) {
        return usuarioRolDAO.obtenerRolesPorUsuario(usuarioId);
    }

    // Obtiene todos los usuarios con un rol específico
    public List<UsuarioRol> obtenerUsuariosPorRol(Long rolId) {
        return usuarioRolDAO.obtenerUsuariosPorRol(rolId);
    }

    // Obtiene una relación específica usuario-rol
    public UsuarioRol obtenerUsuarioRolPorUsuarioYRol(Long usuarioId, Long rolId) {
        return usuarioRolDAO.obtenerUsuarioRolPorUsuarioYRol(usuarioId, rolId);
    }
}