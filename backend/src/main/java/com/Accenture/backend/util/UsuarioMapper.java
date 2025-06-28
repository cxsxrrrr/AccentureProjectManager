package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

/*
 * MAPPER DE ENTIDAD A DTO
 */

@Mapper(
        componentModel               = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UsuarioMapper {

    UsuarioDTO toDTO(Usuario usuario);

    @org.mapstruct.Mapping(target = "rol", ignore = true)
    Usuario toEntity(UsuarioDTO usuarioDTO);

    void updateUsuarioFromDto(UsuarioDTO dto, @MappingTarget Usuario entity);
}