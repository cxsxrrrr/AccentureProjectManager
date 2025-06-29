package com.Accenture.backend.util;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import com.Accenture.backend.model.RecursosProyecto;
import com.Accenture.backend.domain.dto.RecursosProyectoDTO;
import com.Accenture.backend.model.Recurso;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Usuario;

@Mapper(componentModel = "spring")
public interface RecursosProyectoMapper {
    RecursosProyectoMapper INSTANCE = Mappers.getMapper(RecursosProyectoMapper.class);

    @Mapping(source = "recursoId.recursoId", target = "recursoId")
    @Mapping(source = "proyectoId.proyectoId", target = "proyectoId")
    @Mapping(source = "asignadoPor.usuarioId", target = "asignadoPor")
    RecursosProyectoDTO toDTO(RecursosProyecto entity);

    @Mapping(source = "recursoId", target = "recursoId", qualifiedByName = "longToRecurso")
    @Mapping(source = "proyectoId", target = "proyectoId", qualifiedByName = "longToProyecto")
    @Mapping(source = "asignadoPor", target = "asignadoPor", qualifiedByName = "longToUsuario")
    RecursosProyecto toEntity(RecursosProyectoDTO dto);

    @Named("longToRecurso")
    default Recurso longToRecurso(Long id) {
        if (id == null) return null;
        Recurso r = new Recurso();
        r.setRecursoId(id);
        return r;
    }

    @Named("longToProyecto")
    default Proyecto longToProyecto(Long id) {
        if (id == null) return null;
        Proyecto p = new Proyecto();
        p.setProyectoId(id);
        return p;
    }

    @Named("longToUsuario")
    default Usuario longToUsuario(Long id) {
        if (id == null) return null;
        Usuario u = new Usuario();
        u.setUsuarioId(id);
        return u;
    }
}
