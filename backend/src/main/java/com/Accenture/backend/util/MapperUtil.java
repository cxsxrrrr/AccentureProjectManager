package com.Accenture.backend.util;

import com.Accenture.backend.dto.ProyectoDTO;
import com.Accenture.backend.model.Proyecto;

public class MapperUtil {

    public static ProyectoDTO mapToProyectoDTO(Proyecto proyecto) {
        if (proyecto == null) return null;

        return ProyectoDTO.builder()
                .proyectoId(proyecto.getProyectoId())
                .nombreTitulo(proyecto.getNombreProyecto())
                .descripcion(proyecto.getDescripcionProyecto())
                .fechaInicio(proyecto.getFechaInicio())
                .fechaFin(proyecto.getFechaFin())
                .fechaFinReal(proyecto.getFechaFinReal())
                .estado(proyecto.getEstado())
                .cliente(proyecto.getCliente())
                .gerenteProyecto(proyecto.getGerenteProyecto())
                .creadoPor(proyecto.getCreadoPor())
                .fechaCreacion(proyecto.getFechaCreacion())
                .build();
    }

    public static Proyecto mapToProyecto(ProyectoDTO dto) {
        if (dto == null) return null;

        return Proyecto.builder()
                .proyectoId(dto.getProyectoId())
                .nombreProyecto(dto.getNombreTitulo())
                .descripcionProyecto(dto.getDescripcion())
                .fechaInicio(dto.getFechaInicio())
                .fechaFin(dto.getFechaFin())
                .fechaFinReal(dto.getFechaFinReal())
                .estado(dto.getEstado())
                .cliente(dto.getCliente())
                .gerenteProyecto(dto.getGerenteProyecto())
                .creadoPor(dto.getCreadoPor())
                .fechaCreacion(dto.getFechaCreacion())
                .build();
    }
}
