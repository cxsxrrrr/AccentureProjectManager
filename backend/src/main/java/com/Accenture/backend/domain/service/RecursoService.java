package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.RecursoDAO;
import com.Accenture.backend.domain.dto.RecursoDTO;
import com.Accenture.backend.domain.repository.RecursoRepository;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.Recurso;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.util.RecursoMapper;
import com.Accenture.backend.util.ProyectoMapper;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecursoService {

    private final RecursoDAO recursoDAO;
    private final RecursoRepository recursoRepository;
    private final RecursoMapper recursoMapper;
    private final ProyectoRepository proyectoRepository;
    private final ProyectoMapper proyectoMapper;

    public RecursoService(
            RecursoDAO recursoDAO,
            RecursoMapper recursoMapper,
            RecursoRepository recursoRepository,
            ProyectoRepository proyectoRepository,
            ProyectoMapper proyectoMapper
    ) {
        this.recursoDAO = recursoDAO;
        this.recursoMapper = recursoMapper;
        this.recursoRepository = recursoRepository;
        this.proyectoRepository = proyectoRepository;
        this.proyectoMapper = proyectoMapper;
    }

    // Crear recurso
    public RecursoDTO crearRecurso(RecursoDTO dto) {
        Recurso recurso = recursoMapper.toEntity(dto);
        recurso = recursoDAO.guardarRecurso(recurso);
        return recursoMapper.toDTO(recurso);
    }

    // Obtener recurso por Id
    public RecursoDTO obtenerRecursoxId(Long recursoId) {
        Recurso recurso = Optional.ofNullable(recursoDAO.buscarRecursoxId(recursoId))
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));
        return recursoMapper.toDTO(recurso);
    }

    // Obtener todos los recursos
    public List<RecursoDTO> obtenerTodosLosRecursos() {
        return recursoDAO.obtenerRecursos().stream()
                .map(recursoMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Eliminar recurso por ID
    public void eliminarRecursoxId(Long recursoId) {
        Recurso recurso = Optional.ofNullable(recursoDAO.buscarRecursoxId(recursoId))
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));
        recursoDAO.eliminarRecurso(recurso);
    }

    // Actualizar recurso por ID
    public RecursoDTO actualizarRecursoxId(Long recursoId, RecursoDTO dto) {
        Recurso recursoExistente = Optional.ofNullable(recursoDAO.buscarRecursoxId(recursoId))
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));
        dto.setRecursoId(recursoId);
        recursoMapper.updateRecursoFromDto(dto, recursoExistente);
        Recurso updated = recursoDAO.actualizarRecurso(recursoExistente);
        return recursoMapper.toDTO(updated);
    }

    // Actualización parcial de recurso por ID (PATCH)
    public RecursoDTO patchRecursoxId(Long recursoId, RecursoDTO dto) {
        Recurso recursoExistente = Optional.ofNullable(recursoDAO.buscarRecursoxId(recursoId))
                .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));
        // Solo actualiza los campos no nulos del DTO recibido
        if (dto.getNombreRecurso() != null) recursoExistente.setNombreRecurso(dto.getNombreRecurso());
        if (dto.getDescripcionRecurso() != null) recursoExistente.setDescripcionRecurso(dto.getDescripcionRecurso());
        if (dto.getEstado() != null) recursoExistente.setDisponibilidad(dto.getEstado());
        if (dto.getCoste() != null) {
            try {
                recursoExistente.setCosto(Double.valueOf(dto.getCoste()));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("El campo 'coste' debe ser un número válido");
            }
        }
        if (dto.getTipo() != null) recursoExistente.setTipo(dto.getTipo());
        if (dto.getCantidad() != null) recursoExistente.setCantidad(dto.getCantidad());
        Recurso updated = recursoDAO.actualizarRecurso(recursoExistente);
        return recursoMapper.toDTO(updated);
    }

    // Normalizar texto removiendo acentos y pasando a mayúsculas
    private String normalize(String text) {
        if (text == null) return "";
        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
        return normalized.replaceAll("\\p{M}", "").toUpperCase();
    }

    // Búsqueda de recursos por nombreRecurso (case & accent insensitive)
    public List<RecursoDTO> buscarRecursosPorNombre(String nombre) {
        String term = normalize(nombre);
        return recursoDAO.obtenerRecursos().stream()
                .filter(r -> normalize(r.getNombreRecurso()).contains(term))
                .map(recursoMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Búsqueda de recursos por disponibilidad (case & accent insensitive)
    public List<RecursoDTO> buscarRecursosPorDisponibilidad(String disponibilidad) {
        String term = normalize(disponibilidad);
        return recursoDAO.obtenerRecursos().stream()
                .filter(r -> normalize(r.getDisponibilidad()).contains(term))
                .map(recursoMapper::toDTO)
                .collect(Collectors.toList());
    }
}