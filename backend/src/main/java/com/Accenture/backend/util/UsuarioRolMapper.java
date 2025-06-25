package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.UsuarioRolDTO;
import com.Accenture.backend.model.Rol;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.UsuarioRol;
import org.springframework.stereotype.Component;

@Component
public class UsuarioRolMapper {

    // Convierte de entidad a DTO
    public UsuarioRolDTO toDTO(UsuarioRol usuarioRol) {
        if (usuarioRol == null) {
            return null;
        }

        UsuarioRolDTO dto = new UsuarioRolDTO();
        dto.setId(usuarioRol.getId());
        dto.setUsuarioId(usuarioRol.getUsuario().getUsuarioId());
        dto.setRolId(usuarioRol.getRol().getRolId());
        return dto;
    }

    // Convierte de DTO a entidad
    public UsuarioRol toEntity(UsuarioRolDTO dto, Usuario usuario, Rol rol) {
        if (dto == null || usuario == null || rol == null) {
            return null;
        }

        UsuarioRol entity = new UsuarioRol();
        entity.setId(dto.getId()); // Puede ser null si se va a crear
        entity.setUsuario(usuario);
        entity.setRol(rol);
        return entity;
    }
}