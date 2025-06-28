package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.PermisoDTO;

import java.util.List;
import java.util.Optional;

public interface PermisoService {
    PermisoDTO guardar(PermisoDTO permisoDTO);
    List<PermisoDTO> listarTodos();
    Optional<PermisoDTO> obtenerPorNombre(String nombre);
    void eliminarPorId(Long id);
}

