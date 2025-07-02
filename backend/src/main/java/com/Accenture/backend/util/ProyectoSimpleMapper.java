package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoSimpleDTO;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProyectoSimpleMapper {
    ProyectoSimpleDTO toDTO(Proyecto entity);
}
