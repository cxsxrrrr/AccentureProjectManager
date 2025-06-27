package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.MiembroTareaDTO;
import com.Accenture.backend.model.MiembroTarea;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface MiembroTareaMapper {

    @Mappings({
            @Mapping(target = "usuario.usuarioId", source = "usuarioId"),
            @Mapping(target = "tarea.tareasId", source = "tareaId"),
            @Mapping(target = "proyecto.proyectoId", source = "proyectoId"),  // <- Agregado
            @Mapping(target = "asignadoPor.usuarioId", source = "asignadoPorId")
    })
    MiembroTarea toEntity(MiembroTareaDTO dto);

    @Mappings({
            @Mapping(source = "usuario.usuarioId", target = "usuarioId"),
            @Mapping(source = "tarea.tareasId", target = "tareaId"),
            @Mapping(source = "proyecto.proyectoId", target = "proyectoId"),  // <- Agregado
            @Mapping(source = "asignadoPor.usuarioId", target = "asignadoPorId")
    })
    MiembroTareaDTO toDTO(MiembroTarea entity);
}