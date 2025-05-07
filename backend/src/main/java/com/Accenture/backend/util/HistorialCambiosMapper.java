package com.Accenture.backend.util;

/*
 * MAPPER DE ENTIDAD A DTO
 */

import com.Accenture.backend.domain.dto.HistorialCambiosDTO;
import com.Accenture.backend.model.HistorialCambios;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface HistorialCambiosMapper {

    HistorialCambiosDTO toDTO(HistorialCambios historialCambios);
    HistorialCambios toEntity(HistorialCambiosDTO historialCambiosDTO);

}
