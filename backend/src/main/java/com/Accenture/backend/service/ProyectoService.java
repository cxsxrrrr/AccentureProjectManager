package com.Accenture.backend.service;

import com.Accenture.backend.dao.ProyectoDAO;
import com.Accenture.backend.dto.ProyectoDTO;

import com.Accenture.backend.util.MapperUtil;

import com.Accenture.backend.model.Proyecto;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
public class ProyectoService {

    private ProyectoDAO proyectoDAO;

    public ProyectoService(ProyectoDAO proyectoDAO) {
        this.proyectoDAO = proyectoDAO;
    }

    public ProyectoDTO crearProyecto(ProyectoDTO dto) {
        Proyecto proyecto = Proyecto.builder()
                .proyectoId(dto.getProyectoId())
                .nombreProyecto(dto.getNombreTitulo())
                .descripcionProyecto(dto.getDescripcion())
                .fechaInicio(dto.getFechaInicio())
                .fechaFin(dto.getFechaFin())
                .fechaFinReal(dto.getFechaFinReal())
                .estado(dto.getEstado())
                .fechaCreacion(dto.getFechaCreacion())
                .cliente(dto.getCliente())
                .gerenteProyecto(dto.getGerenteProyecto())
                .creadoPor(dto.getCreadoPor())
                .build();

        proyecto = proyectoDAO.guardarProyecto(proyecto);

        return MapperUtil.mapToProyectoDTO(proyecto);
    }



}
