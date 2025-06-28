package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/*
* MAPPER DE ENTIDAD A DTO
*/
@Mapper(
    componentModel = "spring",
    uses = UsuarioMapper.class,
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProyectoMapper {

    ProyectoDTO toDTO(Proyecto proyecto);

    Proyecto toEntity(ProyectoDTO proyectoDTO);

    void updateProyectoFromDto(ProyectoDTO dto, @MappingTarget Proyecto entity);
}
