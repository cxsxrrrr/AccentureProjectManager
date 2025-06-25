package com.Accenture.backend.dao;

import com.Accenture.backend.domain.repository.UsuarioRolRepository;
import com.Accenture.backend.model.UsuarioRol;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsuarioRolDAO {

    private final UsuarioRolRepository usuarioRolRepository;

    public UsuarioRolDAO(UsuarioRolRepository usuarioRolRepository) {
        this.usuarioRolRepository = usuarioRolRepository;
    }

    // Guardar o actualizar una relación UsuarioRol
    public UsuarioRol guardarUsuarioRol(UsuarioRol usuarioRol) {
        return usuarioRolRepository.save(usuarioRol);
    }

    // Eliminar una relación UsuarioRol
    public void eliminarUsuarioRol(UsuarioRol usuarioRol) {
        usuarioRolRepository.delete(usuarioRol);
    }

    // Buscar relación por ID
    public UsuarioRol buscarUsuarioRolPorId(Long id) {
        return usuarioRolRepository.findById(id).orElse(null);
    }

    // Listar todas las relaciones
    public List<UsuarioRol> obtenerUsuarioRoles() {
        return usuarioRolRepository.findAll();
    }

    // Buscar roles por usuario
    public List<UsuarioRol> obtenerRolesPorUsuario(Long usuarioId) {
        return usuarioRolRepository.findByUsuarioUsuarioId(usuarioId);
    }

    // Buscar usuarios por rol
    public List<UsuarioRol> obtenerUsuariosPorRol(Long rolId) {
        return usuarioRolRepository.findByRolRolId(rolId);
    }

    // Buscar relación específica usuario-rol
    public UsuarioRol obtenerUsuarioRolPorUsuarioYRol(Long usuarioId, Long rolId) {
        return usuarioRolRepository.findByUsuarioUsuarioIdAndRolRolId(usuarioId, rolId);
    }
}