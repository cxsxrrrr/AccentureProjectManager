package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRolRepository extends JpaRepository<UsuarioRol, Long> {

    // Buscar todos los roles asignados a un usuario por su ID
    List<UsuarioRol> findByUsuarioUsuarioId(Long usuarioId);

    // Buscar todas las asignaciones para un rol específico
    List<UsuarioRol> findByRolRolId(Long rolId);

    // Buscar una relación específica entre usuario y rol
    UsuarioRol findByUsuarioUsuarioIdAndRolRolId(Long usuarioId, Long rolId);

}