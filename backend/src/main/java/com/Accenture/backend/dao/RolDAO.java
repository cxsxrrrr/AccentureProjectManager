package com.Accenture.backend.dao;

import com.Accenture.backend.model.Rol;
import java.util.List;
import java.util.Optional;

public interface RolDAO {
    Rol guardarRol(Rol rol);
    List<Rol> listarRoles();
    Optional<Rol> buscarPorNombre(String nombre);
    Optional<Rol> buscarPorId(Long id);
    Rol actualizarRol(Rol rol);
}
