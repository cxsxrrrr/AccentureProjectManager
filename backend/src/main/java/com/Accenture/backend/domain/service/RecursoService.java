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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecursoService {

    private RecursoDAO recursoDAO;
    private RecursoRepository recursoRepository;
    private RecursoMapper recursoMapper;
    private ProyectoRepository proyectoRepository;
    private ProyectoMapper proyectoMapper;

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

    public RecursoDTO crearRecurso(RecursoDTO dto) {
        // Manejadores de Error
        Proyecto proyecto = proyectoRepository.findById(dto.getProyecto().getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        dto.setProyecto(proyectoMapper.toDTO(proyecto));
        // Convertimos el Recurso a Entidad
        RecursoProyecto recurso = recursoMapper.toEntity(dto);
        // Guardamos el hito
        recurso = recursoDAO.guardarRecurso(recurso);
        // Convertimos la entidad a DTO y lo retornamos
        return recursoMapper.toDTO(recurso);

        public RecursoDTO obtenerRecursoxID(Long recursoId) {
            Recurso recurso = Optional.ofNullable(recursoDAO.buscarRecursoxId(recursoId))
                    .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));
            // Retornamos DTO del recurso
            return recursoMapper.toDTO(recurso);
        }

        public List<RecursoDTO> obtenerTodosLosRecursos() {
            // Retornamos todos los recursos
            return recursoDAO.obtenerRecursos().stream()
                    .map(recursoMapper::toDTO)
                    .collect(Collectors.toList());
        }

        public void eliminarRecursoxId(Long proyectoId) {
            recurso recurso = Optional.ofNullable(proyectoDAO.buscarProyectoxId(proyectoId))
                    .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));
            // Ahora eliminar el recurso
            recursoDAO.eliminarRecurso(recurso);
        }

        public RecursoDTO actualizarRecursoxId(Long recursoId, RecursoDTO dto) {
            // Buscar recurso existente
            Recurso recursoExistente = Optional.ofNullable(recursoDAO.buscarRecursoxId(recursoId))
                    .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado"));

            // Establecer el ID en el DTO para asegurar consistencia
            dto.setRecursoId(recursoId);
            }

            // Actualizar otros campos no nulos del DTO
            recursoMapper.updateRecursoFromDto(dto, recursoExistente);

            // Guardar cambios
            Recurso updated = recursoDAO.actualizarRecurso(recursoExistente);
            return recursoMapper.toDTO(updated);
        }

        // Normalizar texto removiendo acentos y pasando a mayúsculas
        private String normalize(String text) {
            if (text == null) return "";
            String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
            return normalized.replaceAll("\\p{M}", "").toUpperCase();
        }

        // Búsqueda de Recursos por nombre (case & accent insensitive)
        public List<RecursoDTO> buscarRecursoPorNombre(String nombre) {
            String term = normalize(nombre);
            return proyectoDAO.obtenerProyectos().stream()
                    .filter(p -> normalize(p.getNombreProyecto()).contains(term))
                    .map(proyectoMapper::toDTO)
                    .collect(Collectors.toList());
        }

        // Búsqueda de Recursos por estado (case & accent insensitive)
        public List<ProyectoDTO> buscarProyectosPorEstado(String estado) {
            String term = normalize(estado);
            return proyectoDAO.obtenerProyectos().stream()
                    .filter(p -> normalize(p.getEstado()).contains(term))
                    .map(proyectoMapper::toDTO)
                    .collect(Collectors.toList());
        }

    }