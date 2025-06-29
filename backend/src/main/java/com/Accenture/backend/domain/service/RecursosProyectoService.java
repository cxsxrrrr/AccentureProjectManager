package com.Accenture.backend.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.Accenture.backend.dao.RecursosProyectoDAO;
import com.Accenture.backend.model.RecursosProyecto;
import com.Accenture.backend.domain.dto.RecursosProyectoDTO;
import com.Accenture.backend.util.RecursosProyectoMapper;

@Service
public class RecursosProyectoService {
    private final RecursosProyectoDAO recursosProyectoDAO;
    private final RecursosProyectoMapper mapper;

    @Autowired
    public RecursosProyectoService(RecursosProyectoDAO recursosProyectoDAO, RecursosProyectoMapper mapper) {
        this.recursosProyectoDAO = recursosProyectoDAO;
        this.mapper = mapper;
    }

    public RecursosProyectoDTO save(RecursosProyectoDTO dto) {
        RecursosProyecto entity = mapper.toEntity(dto);
        return mapper.toDTO(recursosProyectoDAO.save(entity));
    }

    public List<RecursosProyectoDTO> findAll() {
        return recursosProyectoDAO.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public Optional<RecursosProyectoDTO> findById(Long id) {
        return recursosProyectoDAO.findById(id).map(mapper::toDTO);
    }

    public void deleteById(Long id) {
        recursosProyectoDAO.deleteById(id);
    }

    public RecursosProyectoDTO update(RecursosProyectoDTO dto) {
        RecursosProyecto entity = mapper.toEntity(dto);
        return mapper.toDTO(recursosProyectoDAO.update(entity));
    }

    public List<RecursosProyectoDTO> findByProyectoId(Long proyectoId) {
        return recursosProyectoDAO.findByProyectoId(proyectoId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<RecursosProyectoDTO> findByAsignadoPor(Long usuarioId) {
        return recursosProyectoDAO.findByAsignadoPor(usuarioId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<RecursosProyectoDTO> findByRecursoId(Long recursoId) {
        return recursosProyectoDAO.findByRecursoId(recursoId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<RecursosProyectoDTO> findByFechaAsignacionBetween(LocalDateTime desde, LocalDateTime hasta) {
        return recursosProyectoDAO.findByFechaAsignacionBetween(desde, hasta).stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}
