package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.CategoriaDTO;

import com.Accenture.backend.model.Categoria;

import org.mapstruct.*;

/*
 * MAPPER DE ENTIDAD A DTO
 */

@Mapper(
        componentModel = "spring",
        uses                         = { UsuarioMapper.class },
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy         = ReportingPolicy.IGNORE
)
public interface CategoriaMapper {


    CategoriaDTO toDTO(Categoria categoria);

    @Mapping(target = "categoriaId", ignore = true)

    Categoria toEntity(CategoriaDTO categoriaDTO);

    void updateCategoriaFromDto(CategoriaDTO dto, @MappingTarget Categoria entity);

}