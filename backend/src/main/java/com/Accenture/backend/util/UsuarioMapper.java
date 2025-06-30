package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RolDTO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.model.Rol;
import com.Accenture.backend.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
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

    // Map Rol to RolDTO automatically via default method
    @Mapping(source = "rol", target = "rol")
    UsuarioDTO toDTO(Usuario usuario);

    default RolDTO rolToRolDTO(Rol rol) {
        if (rol == null) {
            return null;
        }
        return RolDTO.builder()
                .rolId(rol.getRolId())
                .nombre(rol.getNombre())
                .estado(rol.getEstado())
                .descripcion(rol.getDescripcion())
                .build();
    }

    @org.mapstruct.Mapping(target = "rol", ignore = true)
    Usuario toEntity(UsuarioDTO usuarioDTO);

    @org.mapstruct.Mapping(target = "rol", ignore = true)
    void updateUsuarioFromDto(UsuarioDTO dto, @MappingTarget Usuario entity);
}