package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UsuarioMapper {

    UsuarioDTO toDTO(Usuario usuario);

    Usuario toEntity(UsuarioDTO usuarioDTO);

    void updateUsuarioFromDto(UsuarioDTO dto, @MappingTarget Usuario entity);
}
