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

// Lógica del negocio

@Service
public class ProyectoService {

    private final ProyectoDAO proyectoDAO;
    private final UsuarioRepository usuarioRepository;

    private final UsuarioMapper usuarioMapper;
    private final ProyectoMapper proyectoMapper;

    // Constructor de ProyectoService
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

    // Lógica de creación del Proyecto
    public ProyectoDTO crearProyecto(ProyectoDTO dto) {
        // Manejadores de Error
        Usuario cliente = usuarioRepository.findById(dto.getCliente().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        Usuario gerente = usuarioRepository.findById(dto.getGerenteProyecto().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Gerente no encontrado"));
        Usuario creador = usuarioRepository.findById(dto.getCreadoPor().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Creador no encontrado"));

        dto.setCliente(usuarioMapper.toDTO(cliente));
        dto.setGerenteProyecto(usuarioMapper.toDTO(gerente));
        dto.setCreadoPor(usuarioMapper.toDTO(creador));

        // Convertimos el proyecto a Entidad
        Proyecto proyecto = proyectoMapper.toEntity(dto);
        // Guardamos el proyecto
        proyecto = proyectoDAO.guardarProyecto(proyecto);
        // Convertimos la entidad a DTO y lo retornamos
        return proyectoMapper.toDTO(proyecto);
    }

    public ProyectoDTO obtenerProyectoxId(Long proyectoId) {
        Proyecto proyecto = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        // Retornamos DTO del proyecto
        return proyectoMapper.toDTO(proyecto);
    }

    public List<ProyectoDTO> obtenerTodosLosProyectos() {
        // Retornamos todos los proyectos
        return proyectoDAO.obtenerProyectos().stream()
                .map(proyectoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void eliminarProyectoxId(Long proyectoId) {
        // Buscamos el proyecto con el Id
        Proyecto proyecto = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        //Eliminamos con el objeto
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