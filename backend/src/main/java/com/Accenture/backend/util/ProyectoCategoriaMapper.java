package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoCategoriaDTO;
import com.Accenture.backend.model.ProyectoCategoria;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

// Importa tu UsuarioMapper
@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {UsuarioMapper.class}
)
public interface ProyectoCategoriaMapper {

    ProyectoCategoriaDTO toDTO(ProyectoCategoria pyCategoria);

    ProyectoCategoria toEntity(ProyectoCategoriaDTO pyCategoriaDTO);

    void updateProyectoCategoriaFromDto(ProyectoCategoriaDTO dto, @MappingTarget ProyectoCategoria entity);
}
