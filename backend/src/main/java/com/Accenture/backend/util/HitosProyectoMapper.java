package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.HitosProyectoDTO;

import com.Accenture.backend.model.HitosProyecto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/*
 * MAPPER DE ENTIDAD A DTO
 */

@Mapper(
        componentModel = "spring",
        uses = ProyectoMapper.class,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface HitosProyectoMapper {
    HitosProyectoDTO toDTO(HitosProyecto hito);

    HitosProyecto toEntity(HitosProyectoDTO hitoDTO);

    void updateHitoFromDto(HitosProyectoDTO dto, @MappingTarget HitosProyecto entity);
}
