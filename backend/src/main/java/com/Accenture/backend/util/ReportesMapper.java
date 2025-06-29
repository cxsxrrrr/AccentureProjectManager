package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ReportesDTO;
import com.Accenture.backend.model.Reportes;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ReportesMapper {

    @Mapping(source = "generadoPor.usuarioId", target = "generadoPorId")
    @Mapping(source = "proyecto.proyectoId", target = "proyectoId")
    ReportesDTO toDTO(Reportes reporte);

    @Mapping(target = "reporteId", ignore = true)
    @Mapping(target = "generadoPor", ignore = true)
    @Mapping(target = "proyecto", ignore = true)
    Reportes toEntity(ReportesDTO dto);
}
