package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.TareaDTO;
import com.Accenture.backend.model.Tarea;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface TareaMapper {

    @Mapping(source = "tareasId", target = "id")
    @Mapping(source = "proyecto.proyectoId", target = "proyectoId")
    @Mapping(source = "creadoPor.usuarioId", target = "creadoPorId")
    TareaDTO toDTO(Tarea tarea);

    @Mapping(source = "id", target = "tareasId")
    @Mapping(source = "proyectoId", target = "proyecto.proyectoId")
    @Mapping(source = "creadoPorId", target = "creadoPor.usuarioId")

    Tarea toEntity(TareaDTO dto);
}
