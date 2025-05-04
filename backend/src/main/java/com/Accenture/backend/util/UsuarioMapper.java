package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.model.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioDTO toDTO(Usuario usuario);

    Usuario toEntity(UsuarioDTO usuarioDTO);
}
