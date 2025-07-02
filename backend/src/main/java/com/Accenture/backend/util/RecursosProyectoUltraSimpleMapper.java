package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RecursosProyectoUltraSimpleDTO;
import com.Accenture.backend.model.RecursosProyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Context;
import com.Accenture.backend.util.ProyectoSimpleMapper;

@Mapper(componentModel = "spring", uses = ProyectoSimpleMapper.class)
public interface RecursosProyectoUltraSimpleMapper {
    @Mapping(target = "proyecto", expression = "java(proyectoSimpleMapper.toDTO(entity.getProyectoId()))")
    @Mapping(source = "recursoId", target = "recurso")
    RecursosProyectoUltraSimpleDTO toDTO(RecursosProyecto entity, @Context ProyectoSimpleMapper proyectoSimpleMapper);
}
