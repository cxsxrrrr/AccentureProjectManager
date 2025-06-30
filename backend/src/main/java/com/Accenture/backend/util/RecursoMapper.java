package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RecursoDTO;
import com.Accenture.backend.model.Recurso;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    uses = {UsuarioMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface RecursoMapper {

    @Mapping(source = "disponibilidad", target = "estado")
    @Mapping(source = "costo", target = "coste")
    @Mapping(source = "cantidad", target = "cantidad")
    RecursoDTO toDTO(Recurso recurso);

    @Mapping(target = "recursoId", ignore = true)
    @Mapping(source = "estado", target = "disponibilidad")
    @Mapping(source = "coste", target = "costo")
    @Mapping(source = "cantidad", target = "cantidad")
    Recurso toEntity(RecursoDTO recursoDTO);

    @Mapping(target = "recursoId", ignore = true)
    @Mapping(source = "estado", target = "disponibilidad")
    @Mapping(source = "coste", target = "costo")
    @Mapping(source = "cantidad", target = "cantidad")
    void updateRecursoFromDto(RecursoDTO dto, @MappingTarget Recurso entity);
}