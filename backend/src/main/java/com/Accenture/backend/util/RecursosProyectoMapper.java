package com.Accenture.backend.util;

import com.Accenture.backend.domain.dto.RecursosProyectoDTO;
import com.Accenture.backend.model.RecursosProyecto;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Recurso;
import com.Accenture.backend.model.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecursosProyectoMapper {
    @Mapping(source = "recursoId.recursoId", target = "recursoId")
    @Mapping(source = "proyectoId.proyectoId", target = "proyectoId")
    @Mapping(source = "asignadoPor.usuarioId", target = "asignadoPor")
    RecursosProyectoDTO toDTO(RecursosProyecto entity);

    @Mapping(source = "recursoId", target = "recursoId")
    @Mapping(source = "proyectoId", target = "proyectoId")
    @Mapping(source = "asignadoPor", target = "asignadoPor")
    RecursosProyecto toEntity(RecursosProyectoDTO dto);

    default Usuario asignadoPor(Long id) {
        if (id == null) return null;
        Usuario u = new Usuario();
        u.setUsuarioId(id);
        return u;
    }
    default Recurso recursoId(Long id) {
        if (id == null) return null;
        Recurso r = new Recurso();
        r.setRecursoId(id);
        return r;
    }
    default Proyecto proyectoId(Long id) {
        if (id == null) return null;
        Proyecto p = new Proyecto();
        p.setProyectoId(id);
        return p;
    }
}
