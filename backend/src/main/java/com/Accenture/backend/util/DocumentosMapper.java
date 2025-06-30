package com.Accenture.backend.util;

import com.Accenture.backend.model.Documentos;
import com.Accenture.backend.domain.dto.DocumentosDTO;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring",
        uses                         = { UsuarioMapper.class },
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy         = ReportingPolicy.IGNORE
)
public interface DocumentosMapper {
    DocumentosMapper INSTANCE = Mappers.getMapper(DocumentosMapper.class);

    @Mapping(source = "proyectoId.proyectoId", target = "proyectoId")
    DocumentosDTO toDTO(Documentos documento);

    @Mapping(source = "proyectoId", target = "proyectoId", qualifiedByName = "longToProyecto")
    Documentos toEntity(DocumentosDTO dto);

    @Named("longToProyecto")
    default Proyecto longToProyecto(Long id) {
        if (id == null) return null;
        Proyecto p = new Proyecto();
        p.setProyectoId(id);
        return p;
    }

    default Long proyectoToLong(Proyecto proyecto) {
        return proyecto != null ? proyecto.getProyectoId() : null;
    }
}
