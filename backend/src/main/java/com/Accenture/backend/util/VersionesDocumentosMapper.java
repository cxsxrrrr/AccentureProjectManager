package com.Accenture.backend.util;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import com.Accenture.backend.model.VersionesDocumentos;
import com.Accenture.backend.domain.dto.VersionesDocumentosDTO;
import com.Accenture.backend.model.Documentos;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Tarea;

@Mapper(componentModel = "spring")
public interface VersionesDocumentosMapper {
    VersionesDocumentosMapper INSTANCE = Mappers.getMapper(VersionesDocumentosMapper.class);

    @Mapping(source = "documentosId.documentoId", target = "documentosId")
    @Mapping(source = "subidoPor.usuarioId", target = "subidoPor")
    @Mapping(source = "tareasId.tareasId", target = "tareasId")
    VersionesDocumentosDTO toDTO(VersionesDocumentos entity);

    @Mapping(source = "documentosId", target = "documentosId", qualifiedByName = "longToDocumentos")
    @Mapping(source = "subidoPor", target = "subidoPor", qualifiedByName = "longToUsuario")
    @Mapping(source = "tareasId", target = "tareasId", qualifiedByName = "longToTarea")
    VersionesDocumentos toEntity(VersionesDocumentosDTO dto);

    @Named("longToDocumentos")
    default Documentos longToDocumentos(Long id) {
        if (id == null) return null;
        Documentos d = new Documentos();
        d.setDocumentoId(id);
        return d;
    }

    @Named("longToUsuario")
    default Usuario longToUsuario(Long id) {
        if (id == null) return null;
        Usuario u = new Usuario();
        u.setUsuarioId(id);
        return u;
    }

    @Named("longToTarea")
    default Tarea longToTarea(Long id) {
        if (id == null) return null;
        Tarea t = new Tarea();
        t.setTareasId(id);
        return t;
    }
}
