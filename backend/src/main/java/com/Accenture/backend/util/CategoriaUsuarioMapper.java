package com.Accenture.backend.util;

/*
 * MAPPER DE ENTIDAD A DTO
 */

import com.Accenture.backend.domain.dto.CategoriaDTO;
import com.Accenture.backend.domain.dto.CategoriaUsuarioDTO;
import com.Accenture.backend.model.Categoria;
import com.Accenture.backend.model.CategoriaUsuario;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        uses                         = { UsuarioMapper.class },
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy         = ReportingPolicy.IGNORE
)
public interface CategoriaUsuarioMapper {
    CategoriaUsuarioDTO toDTO(CategoriaUsuario categoriaUsuario);
    CategoriaUsuario toEntity(CategoriaUsuarioDTO categoriaUsuarioDTO);
}
