package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
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

    @Mapping(target = "cliente", ignore = true)
    @Mapping(target = "gerenteProyecto", ignore = true)
    @Mapping(target = "creadoPor", ignore = true)
    void updateProyectoFromDto(ProyectoDTO dto, @MappingTarget Proyecto entity);
}
