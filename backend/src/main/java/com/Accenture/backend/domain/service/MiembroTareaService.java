package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.MiembroTareaDTO;
import com.Accenture.backend.domain.repository.MiembroTareaRepository;
import com.Accenture.backend.model.MiembroTarea;
import com.Accenture.backend.util.MiembroTareaMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MiembroTareaService {

    private final MiembroTareaRepository miembroTareaRepository;
    private final MiembroTareaMapper miembroTareaMapper;

    public MiembroTareaService(MiembroTareaRepository miembroTareaRepository, MiembroTareaMapper miembroTareaMapper) {
        this.miembroTareaRepository = miembroTareaRepository;
        this.miembroTareaMapper = miembroTareaMapper;
    }

    public List<MiembroTareaDTO> getByProyectoId(Long proyectoId) {
        List<MiembroTarea> entidades = miembroTareaRepository.findByProyecto_ProyectoId(proyectoId);
        return entidades.stream().map(miembroTareaMapper::toDTO).collect(Collectors.toList());
    }

    public List<MiembroTareaDTO> getByUsuarioId(Long usuarioId) {
        List<MiembroTarea> entidades = miembroTareaRepository.findByUsuario_UsuarioId(usuarioId);
        return entidades.stream().map(miembroTareaMapper::toDTO).collect(Collectors.toList());
    }

    public MiembroTareaDTO getMiembroTareaById(Long id) {
        return miembroTareaRepository.findById(id)
                .map(miembroTareaMapper::toDTO)
                .orElse(null);
    }

    public MiembroTareaDTO crearMiembroTarea(MiembroTareaDTO dto) {
        MiembroTarea entidad = miembroTareaMapper.toEntity(dto);
        MiembroTarea guardado = miembroTareaRepository.save(entidad);
        return miembroTareaMapper.toDTO(guardado);
    }
}