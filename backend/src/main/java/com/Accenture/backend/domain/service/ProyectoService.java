package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.ProyectoDAO;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.domain.repository.UsuarioRepository;

import com.Accenture.backend.exception.ResourceNotFoundException;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Proyecto;

import com.Accenture.backend.util.ProyectoMapper;
import com.Accenture.backend.util.UsuarioMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class ProyectoService {

    private final ProyectoDAO proyectoDAO;
    private final ProyectoMapper proyectoMapper;
    private final UsuarioRepository usuarioRepository;

    private final UsuarioMapper usuarioMapper;

    public ProyectoService(
            ProyectoDAO proyectoDAO,
            ProyectoMapper proyectoMapper,
            UsuarioRepository usuarioRepository,
            UsuarioMapper usuarioMapper
    ) {
        this.proyectoDAO = proyectoDAO;
        this.proyectoMapper = proyectoMapper;
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public ProyectoDTO crearProyecto(ProyectoDTO dto) {
        Usuario cliente = usuarioRepository.findById(dto.getCliente().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));      // ← cambiado
        Usuario gerente = usuarioRepository.findById(dto.getGerenteProyecto().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Gerente no encontrado"));      // ← cambiado
        Usuario creador = usuarioRepository.findById(dto.getCreadoPor().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Creador no encontrado"));      // ← cambiado

        dto.setCliente(usuarioMapper.toDTO(cliente));
        dto.setGerenteProyecto(usuarioMapper.toDTO(gerente));
        dto.setCreadoPor(usuarioMapper.toDTO(creador));

        Proyecto proyecto = proyectoMapper.toEntity(dto);
        proyecto = proyectoDAO.guardarProyecto(proyecto);
        return proyectoMapper.toDTO(proyecto);
    }

    public ProyectoDTO obtenerProyectoxId(Long proyectoId) {
        Proyecto proyecto = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        return proyectoMapper.toDTO(proyecto);
    }

    public List<ProyectoDTO> obtenerTodosLosProyectos() {
        return proyectoDAO.obtenerProyectos().stream()
                .map(proyectoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void eliminarProyectoxId(Long proyectoId) {
        Proyecto proyecto = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        proyectoDAO.eliminarProyecto(proyecto);
    }

    public ProyectoDTO actualizarProyectoxId(Long proyectoId, ProyectoDTO dto) {
        Proyecto existing = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
            
        // vuelca sólo los campos no nulos de dto sobre existing
        proyectoMapper.updateProyectoFromDto(dto, existing);
        Proyecto saved = proyectoDAO.actualizarProyecto(existing);
        return proyectoMapper.toDTO(saved);
    }
}