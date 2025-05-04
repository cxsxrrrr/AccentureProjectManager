package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.ProyectoDAO;
import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.util.ProyectoMapper;
import com.Accenture.backend.model.Proyecto;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {

    private final ProyectoDAO proyectoDAO;
    private final ProyectoMapper proyectoMapper;


    public ProyectoService(ProyectoDAO proyectoDAO, ProyectoMapper proyectoMapper) {
        this.proyectoDAO = proyectoDAO;
        this.proyectoMapper = proyectoMapper;

    }

    public ProyectoDTO crearProyecto(ProyectoDTO dto) {
        // ProyectoDTO a Proyecto
        Proyecto proyecto = proyectoMapper.toEntity(dto);

        // Guardar proyecto en la base de datos
        proyecto = proyectoDAO.guardarProyecto(proyecto);

        // Se convierte a DTO otra vez
        return proyectoMapper.toDTO(proyecto);
    }
}
