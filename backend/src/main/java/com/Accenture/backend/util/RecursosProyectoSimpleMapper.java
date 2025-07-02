package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RecursosProyectoSimpleDTO;
import com.Accenture.backend.model.RecursosProyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecursosProyectoSimpleMapper {
    @Mapping(source = "recursoId", target = "recurso")
    @Mapping(source = "proyectoId", target = "proyecto")
    RecursosProyectoSimpleDTO toDTO(RecursosProyecto entity);
}
