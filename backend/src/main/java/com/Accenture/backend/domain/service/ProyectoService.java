package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.ProyectoDAO;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import com.Accenture.backend.domain.repository.HitosProyectoRepository;

import com.Accenture.backend.exception.ResourceNotFoundException;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.HitosProyecto;

import com.Accenture.backend.util.ProyectoMapper;
import com.Accenture.backend.util.UsuarioMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.text.Normalizer;

import org.springframework.stereotype.Service;

// Lógica del negocio

@Service
public class ProyectoService {

    private final ProyectoDAO proyectoDAO;
    private final UsuarioRepository usuarioRepository;
    private final HitosProyectoRepository hitosRepo;

    private final UsuarioMapper usuarioMapper;
    private final ProyectoMapper proyectoMapper;

    // Constructor de ProyectoService
    public ProyectoService(
            ProyectoDAO proyectoDAO,
            ProyectoMapper proyectoMapper,
            UsuarioRepository usuarioRepository,
            UsuarioMapper usuarioMapper,
            HitosProyectoRepository hitosRepo
    ) {
        this.proyectoDAO = proyectoDAO;
        this.proyectoMapper = proyectoMapper;
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.hitosRepo = hitosRepo;
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
        proyecto.setFechaCreacion(LocalDateTime.now());
        Proyecto saved = proyectoDAO.guardarProyecto(proyecto);
        return proyectoMapper.toDTO(saved);
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
        Proyecto proyecto = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        // Eliminar hitos asociados primero
        List<HitosProyecto> hitos = hitosRepo.findByProyectoProyectoId(proyectoId);
        hitosRepo.deleteAll(hitos);
        // Ahora eliminar el proyecto
        proyectoDAO.eliminarProyecto(proyecto);
    }

    public ProyectoDTO actualizarProyectoxId(Long proyectoId, ProyectoDTO dto) {
        // Buscar proyecto existente
        Proyecto proyectoExistente = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));

        // Establecer el ID en el DTO para asegurar consistencia
        dto.setProyectoId(proyectoId);
        // Actualizar relaciones de usuario si vienen en DTO
        if (dto.getCliente() != null && dto.getCliente().getUsuarioId() != null) {
            Usuario cliente = usuarioRepository.findById(dto.getCliente().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
            proyectoExistente.setCliente(cliente);
        }
        if (dto.getGerenteProyecto() != null && dto.getGerenteProyecto().getUsuarioId() != null) {
            Usuario gerente = usuarioRepository.findById(dto.getGerenteProyecto().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Gerente no encontrado"));
            proyectoExistente.setGerenteProyecto(gerente);
        }
        if (dto.getCreadoPor() != null && dto.getCreadoPor().getUsuarioId() != null) {
            Usuario creador = usuarioRepository.findById(dto.getCreadoPor().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Creador no encontrado"));
            proyectoExistente.setCreadoPor(creador);
        }

        // Actualizar otros campos no nulos del DTO
        proyectoMapper.updateProyectoFromDto(dto, proyectoExistente);

        // Guardar cambios
        Proyecto updated = proyectoDAO.actualizarProyecto(proyectoExistente);
        return proyectoMapper.toDTO(updated);
    }

    // Normalizar texto removiendo acentos y pasando a mayúsculas
    private String normalize(String text) {
        if (text == null) return "";
        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
        return normalized.replaceAll("\\p{M}", "").toUpperCase();
    }

    // Búsqueda de Proyectos por nombre (case & accent insensitive)
    public List<ProyectoDTO> buscarProyectosPorNombre(String nombre) {
        String term = normalize(nombre);
        return proyectoDAO.obtenerProyectos().stream()
                .filter(p -> normalize(p.getNombreProyecto()).contains(term))
                .map(proyectoMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Búsqueda de Proyectos por estado (case & accent insensitive)
    public List<ProyectoDTO> buscarProyectosPorEstado(String estado) {
        String term = normalize(estado);
        return proyectoDAO.obtenerProyectos().stream()
                .filter(p -> normalize(p.getEstado()).contains(term))
                .map(proyectoMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Búsqueda de Proyectos por rango de fecha de inicio
    public List<ProyectoDTO> buscarProyectosPorFechaInicioEntre(LocalDate inicio, LocalDate fin) {
        return proyectoDAO.buscarProyectosPorFechaInicioEntre(inicio, fin).stream()
                .map(proyectoMapper::toDTO)
                .collect(Collectors.toList());
    }
}