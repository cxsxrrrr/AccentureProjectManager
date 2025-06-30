package com.Accenture.backend.util;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import com.Accenture.backend.model.DependenciaTareas;
import com.Accenture.backend.domain.dto.DependenciaTareasDTO;
import com.Accenture.backend.model.Tarea;

@Mapper(componentModel = "spring")
public interface DependenciaTareasMapper {
    DependenciaTareasMapper INSTANCE = Mappers.getMapper(DependenciaTareasMapper.class);

    @Mapping(source = "tareaId.tareasId", target = "tareaId")
    @Mapping(source = "tareaPresendente.tareasId", target = "tareaPresendente")
    DependenciaTareasDTO toDTO(DependenciaTareas entity);

    @Mapping(source = "tareaId", target = "tareaId", qualifiedByName = "longToTarea")
    @Mapping(source = "tareaPresendente", target = "tareaPresendente", qualifiedByName = "longToTarea")
    DependenciaTareas toEntity(DependenciaTareasDTO dto);

    @Named("longToTarea")
    default Tarea longToTarea(Long id) {
        if (id == null) return null;
        Tarea t = new Tarea();
        t.setTareasId(id);
        return t;
    }
}
