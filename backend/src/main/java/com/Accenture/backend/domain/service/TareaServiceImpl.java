package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.TareaDTO;
import com.Accenture.backend.domain.repository.TareaRepository;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Tarea;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.util.ProyectoMapper;
import com.Accenture.backend.util.TareaMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaServiceImpl implements TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private TareaMapper tareaMapper;

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private ProyectoMapper proyectoMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;
    

    @Override
    public List<TareaDTO> listarPorProyecto(Long proyectoId) {
        List<Tarea> tareas = tareaRepository.findByProyecto_ProyectoId(proyectoId);
        return tareas.stream()
                .map(tareaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TareaDTO guardar(TareaDTO dto) {
        Tarea tarea = tareaMapper.toEntity(dto);

        if (dto.getProyectoId() != null) {
            // Load managed Proyecto entity
            Proyecto proyecto = proyectoRepository.findById(dto.getProyectoId())
                .orElseThrow(() -> new RuntimeException("Proyecto not found: " + dto.getProyectoId()));
            tarea.setProyecto(proyecto);
        }

        if (dto.getCreadoPorId() != null) {
            // Load managed Usuario entity
            Usuario usuario = usuarioRepository.findById(dto.getCreadoPorId())
                .orElseThrow(() -> new RuntimeException("Usuario not found: " + dto.getCreadoPorId()));
            tarea.setCreadoPor(usuario);
        }

        Tarea tareaGuardada = tareaRepository.save(tarea);

        return tareaMapper.toDTO(tareaGuardada);
    }

    @Override
    public List<TareaDTO> listarPorEstado(String estado) {
        Tarea.EstadoTarea estadoEnum;
        try {
            estadoEnum = Tarea.EstadoTarea.valueOf(estado.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado inválido: " + estado);
        }

        List<Tarea> tareas = tareaRepository.findByEstado(estadoEnum);
        return tareas.stream()
                .map(tareaMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    public List<TareaDTO> listarPorPrioridad(String prioridad) {
        Tarea.PrioridadTarea prioridadEnum;
        try {
            prioridadEnum = Tarea.PrioridadTarea.valueOf(prioridad.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Prioridad inválida: " + prioridad);
        }

        List<Tarea> tareas = tareaRepository.findByPrioridad(prioridadEnum);
        return tareas.stream()
                .map(tareaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TareaDTO> listarTodasLasTareas() {
        List<Tarea> tareas = tareaRepository.findAll();
        return tareas.stream()
                .map(tareaMapper::toDTO)
                .collect(Collectors.toList());
    }
}
