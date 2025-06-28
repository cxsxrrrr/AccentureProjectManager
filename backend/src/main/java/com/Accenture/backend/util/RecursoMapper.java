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

    RecursoDTO toDTO(Recurso recurso);

    Recurso toEntity(RecursoDTO recursoDTO);

    @Mapping(target = "gerenteProyecto", ignore = true)
    @Mapping(target = "creadoPor", ignore = true)
    void updateRecursoFromDto(RecursoDTO dto, @MappingTarget recurso entity);
}