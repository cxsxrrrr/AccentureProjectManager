package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = UsuarioMapper.class)
public interface ProyectoMapper {

    ProyectoDTO toDTO(Proyecto proyecto);

    Proyecto toEntity(ProyectoDTO proyectoDTO);
}
