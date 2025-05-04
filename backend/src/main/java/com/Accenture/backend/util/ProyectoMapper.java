package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProyectoMapper {

    @Mapping(source = "cliente", target = "cliente")
    @Mapping(source = "gerenteProyecto", target = "gerenteProyecto")
    @Mapping(source = "creadoPor", target = "creadoPor")
    ProyectoDTO toDTO(Proyecto proyecto);

    @Mapping(source = "cliente", target = "cliente")
    @Mapping(source = "gerenteProyecto", target = "gerenteProyecto")
    @Mapping(source = "creadoPor", target = "creadoPor")
    Proyecto toEntity(ProyectoDTO proyectoDTO);
}
