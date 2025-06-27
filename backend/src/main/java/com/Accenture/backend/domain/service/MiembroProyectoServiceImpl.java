package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.MiembroProyectoDTO;
import com.Accenture.backend.domain.repository.MiembroProyectoRepository;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import com.Accenture.backend.model.MiembroProyecto;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Proyecto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MiembroProyectoServiceImpl implements MiembroProyectoService {

    @Autowired
    private MiembroProyectoRepository miembroProyectoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Override
    public List<MiembroProyectoDTO> listarPorProyecto(Long proyectoId) {
        List<MiembroProyecto> miembros = miembroProyectoRepository.findByProyecto_ProyectoId(proyectoId);
        return miembros.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MiembroProyectoDTO> listarPorUsuario(Long usuarioId) {
        List<MiembroProyecto> miembros = miembroProyectoRepository.findByUsuario_UsuarioId(usuarioId);
        return miembros.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MiembroProyectoDTO guardar(MiembroProyectoDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Proyecto proyecto = proyectoRepository.findById(dto.getProyectoId())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        MiembroProyecto miembro = new MiembroProyecto();
        miembro.setUsuario(usuario);
        miembro.setProyecto(proyecto);
        miembro.setFechaAsignacion(dto.getFechaAsignacion());
        miembro.setFechaDesignacion(dto.getFechaDesignacion());
        miembro.setCapacidadMaxima(dto.getCapacidadMaxima());
        miembro.setDisponibilidad(dto.getDisponibilidad());

        MiembroProyecto guardado = miembroProyectoRepository.save(miembro);

        // Convertimos la entidad guardada a DTO y la retornamos
        return convertToDTO(guardado);
    }

    private MiembroProyectoDTO convertToDTO(MiembroProyecto miembro) {
        MiembroProyectoDTO dto = new MiembroProyectoDTO();
        dto.setId(miembro.getId());
        dto.setUsuarioId(miembro.getUsuario().getUsuarioId());
        dto.setProyectoId(miembro.getProyecto().getProyectoId());
        dto.setFechaAsignacion(miembro.getFechaAsignacion());
        dto.setFechaDesignacion(miembro.getFechaDesignacion());
        dto.setCapacidadMaxima(miembro.getCapacidadMaxima());
        dto.setDisponibilidad(miembro.getDisponibilidad());
        return dto;
    }
}