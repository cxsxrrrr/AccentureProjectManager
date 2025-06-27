package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RolDTO;
import com.Accenture.backend.model.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RolMapper {
    RolDTO toDTO(Rol rol);
    Rol toEntity(RolDTO rolDTO);
}