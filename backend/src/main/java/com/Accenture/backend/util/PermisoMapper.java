package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.PermisoDTO;
import com.Accenture.backend.model.Permiso;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PermisoMapper {
    PermisoDTO toDTO(Permiso permiso);
    Permiso toEntity(PermisoDTO permisoDTO);
}

