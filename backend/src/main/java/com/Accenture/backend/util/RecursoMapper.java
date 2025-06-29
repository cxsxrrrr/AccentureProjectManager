package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RecursoDTO;
import com.Accenture.backend.model.Recurso;
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
public interface RecursoMapper {

    @org.mapstruct.Mapping(source = "disponibilidad", target = "estado")
    @org.mapstruct.Mapping(source = "costo", target = "coste")
    @org.mapstruct.Mapping(source = "proyecto.proyectoId", target = "proyectoId")
    @org.mapstruct.Mapping(target = "gerenteProyecto", ignore = true)
    @org.mapstruct.Mapping(target = "creadoPor", ignore = true)
    RecursoDTO toDTO(Recurso recurso);

    @org.mapstruct.Mapping(target = "recursoId", ignore = true)
    @org.mapstruct.Mapping(source = "estado", target = "disponibilidad")
    @org.mapstruct.Mapping(source = "coste", target = "costo")
    @org.mapstruct.Mapping(source = "proyectoId", target = "proyecto.proyectoId")
    Recurso toEntity(RecursoDTO recursoDTO);

    @org.mapstruct.Mapping(target = "recursoId", ignore = true)
    @org.mapstruct.Mapping(source = "estado", target = "disponibilidad")
    @org.mapstruct.Mapping(source = "coste", target = "costo")
    @org.mapstruct.Mapping(target = "proyecto", ignore = true)
    void updateRecursoFromDto(RecursoDTO dto, @MappingTarget Recurso entity);
}