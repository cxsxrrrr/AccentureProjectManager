package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.HistorialCambiosDAO;
import com.Accenture.backend.domain.dto.HistorialCambiosDTO;
import com.Accenture.backend.domain.repository.HistorialCambiosRepository;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.HistorialCambios;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.util.HistorialCambiosMapper;
import com.Accenture.backend.util.UsuarioMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistorialCambiosService {

    private final HistorialCambiosDAO historialDAO;
    private final HistorialCambiosRepository historialRepository;
    private final HistorialCambiosMapper historialMapper;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    // Constructor de ProyectoService
    public HistorialCambiosService(
            HistorialCambiosDAO historialDAO,
            HistorialCambiosRepository historialRepository,
            HistorialCambiosMapper historialMapper, UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper
    ) {
        this.historialDAO = historialDAO;
        this.historialRepository = historialRepository;
        this.historialMapper = historialMapper;
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public HistorialCambiosDTO guardarHistorial(HistorialCambiosDTO dto) {
        // Manejadores de Error
        Usuario usuario = usuarioRepository.findById(dto.getUsuario().getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        dto.setUsuario(usuarioMapper.toDTO(usuario));

        // Convertimos el historial a Entidad
        HistorialCambios historial = historialMapper.toEntity(dto);
        // Guardamos el historial
        historial = historialDAO.guardarCambio(historial);
        // Convertimos la entidad a DTO y lo retornamos
        return historialMapper.toDTO(historial);
    }

    public List<HistorialCambiosDTO> obtenerHistorial() {
        // Retornamos todos los proyectos
        return historialDAO.mostrarCambios().stream()
                .map(historialMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<HistorialCambiosDTO> obtenerHistorialxId(Long usuarioId) {
        // Validar existencia de usuario
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        // Obtener cambios del historial por usuario
        return historialDAO.mostrarCambiosxUsuarioId(usuarioId).stream()
                .map(historialMapper::toDTO)
                .collect(Collectors.toList());
    }

}
