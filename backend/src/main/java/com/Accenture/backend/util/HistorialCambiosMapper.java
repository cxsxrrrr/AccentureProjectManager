package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.HistorialCambiosDTO;
import com.Accenture.backend.model.HistorialCambios;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.NullValuePropertyMappingStrategy;

/*
 * MAPPER DE ENTIDAD A DTO
 */

@Mapper(
        componentModel = "spring",
        uses                         = { UsuarioMapper.class },
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy         = ReportingPolicy.IGNORE
)
public interface HistorialCambiosMapper {


    HistorialCambiosDTO toDTO(HistorialCambios historialCambios);

    @Mapping(target = "historialCambiosId", ignore = true)
    @Mapping(target = "entidadId",         ignore = true)

    HistorialCambios toEntity(HistorialCambiosDTO historialCambiosDTO);

}