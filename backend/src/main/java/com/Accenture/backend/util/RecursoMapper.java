package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RecursoDTO;
import com.Accenture.backend.model.Recurso;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

/*
 * MAPPER DE ENTIDAD A DTO
 */
@Mapper(
        componentModel = "spring"
)
public interface RecursoMapper {

    @Mapping(source = "disponibilidad", target = "estado")
    @Mapping(source = "costo", target = "coste")
    RecursoDTO toDTO(Recurso recurso);

    @Mapping(source = "estado", target = "disponibilidad")
    @Mapping(source = "coste", target = "costo")
    Recurso toEntity(RecursoDTO recursoDTO);

    @Mapping(source = "estado", target = "disponibilidad")
    @Mapping(source = "coste", target = "costo")
    void updateRecursoFromDto(RecursoDTO dto, @MappingTarget Recurso entity);
}