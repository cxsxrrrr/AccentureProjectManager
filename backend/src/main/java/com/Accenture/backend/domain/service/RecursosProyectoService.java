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
import com.Accenture.backend.domain.dto.RecursosProyectoSimpleDTO;
import com.Accenture.backend.domain.dto.RecursosProyectoUltraSimpleDTO;
import com.Accenture.backend.util.RecursosProyectoMapper;
import com.Accenture.backend.util.RecursosProyectoSimpleMapper;
import com.Accenture.backend.util.RecursosProyectoUltraSimpleMapper;
import com.Accenture.backend.util.ProyectoSimpleMapper;
import com.Accenture.backend.domain.dto.RecursosProyectoCreateDTO;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Recurso;
import com.Accenture.backend.model.Proyecto;

@Service
public class RecursosProyectoService {
    private final RecursosProyectoDAO recursosProyectoDAO;
    private final RecursosProyectoMapper mapper;
    private final RecursosProyectoSimpleMapper simpleMapper;
    private final RecursosProyectoUltraSimpleMapper ultraSimpleMapper;
    private final ProyectoSimpleMapper proyectoSimpleMapper;

    @Autowired
    public RecursosProyectoService(RecursosProyectoDAO recursosProyectoDAO, RecursosProyectoMapper mapper, RecursosProyectoSimpleMapper simpleMapper, RecursosProyectoUltraSimpleMapper ultraSimpleMapper, ProyectoSimpleMapper proyectoSimpleMapper) {
        this.recursosProyectoDAO = recursosProyectoDAO;
        this.mapper = mapper;
        this.simpleMapper = simpleMapper;
        this.ultraSimpleMapper = ultraSimpleMapper;
        this.proyectoSimpleMapper = proyectoSimpleMapper;
    }

    public RecursosProyectoDTO save(RecursosProyectoDTO dto) {
        // Validar si el recurso ya está asignado al proyecto
        boolean exists = recursosProyectoDAO.findByProyectoId(dto.getProyectoId()).stream()
            .anyMatch(rp -> rp.getRecursoId().getRecursoId().equals(dto.getRecursoId()));

        if (exists) {
            throw new IllegalArgumentException("El recurso ya está asignado a este proyecto.");
        }

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
        throw new UnsupportedOperationException("Método eliminado: fechaAsignacion ya no existe");
    }

    public List<RecursosProyectoSimpleDTO> findAllSimple() {
        return recursosProyectoDAO.findAll().stream().map(simpleMapper::toDTO).collect(Collectors.toList());
    }

    public List<RecursosProyectoSimpleDTO> findByProyectoIdSimple(Long proyectoId) {
        return recursosProyectoDAO.findByProyectoId(proyectoId).stream().map(simpleMapper::toDTO).collect(Collectors.toList());
    }

    public List<RecursosProyectoUltraSimpleDTO> findAllUltraSimple() {
        return recursosProyectoDAO.findAll().stream().map(rp -> ultraSimpleMapper.toDTO(rp, proyectoSimpleMapper)).collect(Collectors.toList());
    }

    public List<RecursosProyectoUltraSimpleDTO> findByProyectoIdUltraSimple(Long proyectoId) {
        return recursosProyectoDAO.findByProyectoId(proyectoId).stream().map(rp -> ultraSimpleMapper.toDTO(rp, proyectoSimpleMapper)).collect(Collectors.toList());
    }

    public RecursosProyectoDTO saveFromCreateDTO(RecursosProyectoCreateDTO dto) {
        RecursosProyecto entity = new RecursosProyecto();
        entity.setRecursoId(Recurso.builder().recursoId(dto.getRecursoId()).build());
        entity.setProyectoId(Proyecto.builder().proyectoId(dto.getProyectoId()).build());
        entity.setAsignadoPor(Usuario.builder().usuarioId(dto.getAsignadoPor()).build());
        return mapper.toDTO(recursosProyectoDAO.save(entity));
    }
}
