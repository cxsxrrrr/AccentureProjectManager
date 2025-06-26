package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.RolDTO;

import java.util.List;
import java.util.Optional;

public interface RolService {
    RolDTO guardarRol(RolDTO rolDTO);
    List<RolDTO> listarRoles();
    Optional<RolDTO> buscarPorNombre(String nombre);
}
