package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.HitosProyectoDAO;
import com.Accenture.backend.domain.dto.HitosProyectoDTO;
import com.Accenture.backend.domain.repository.HitosProyectoRepository;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.HitosProyecto;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.util.HitosProyectoMapper;
import com.Accenture.backend.util.ProyectoMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HitosProyectoService {

    private HitosProyectoDAO hitoDAO;
    private HitosProyectoRepository hitoRepository;
    private HitosProyectoMapper hitoMapper;
    private ProyectoRepository proyectoRepository;
    private ProyectoMapper proyectoMapper;

    public HitosProyectoService(
            HitosProyectoDAO hitoDAO,
            HitosProyectoMapper hitoMapper,
            HitosProyectoRepository hitoRepository,
            ProyectoRepository proyectoRepository,
            ProyectoMapper proyectoMapper

    ) {
        this.hitoDAO = hitoDAO;
        this.hitoMapper = hitoMapper;
        this.hitoRepository = hitoRepository;
        this.proyectoRepository = proyectoRepository;
        this.proyectoMapper = proyectoMapper;
    }

    public HitosProyectoDTO crearHito(HitosProyectoDTO dto) {
        // Manejadores de Error

        Proyecto proyecto = proyectoRepository.findById(dto.getProyecto().getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));


        dto.setProyecto(proyectoMapper.toDTO(proyecto));

        // Convertimos el HITO a Entidad
        HitosProyecto hito = hitoMapper.toEntity(dto);
        // Guardamos el hito
        hito = hitoDAO.guardarHito(hito);
        // Convertimos la entidad a DTO y lo retornamos
        return hitoMapper.toDTO(hito);
    }

    public List<HitosProyectoDTO> obtenerHitosPorProyecto(Long proyectoId) {
        // Validamos que el proyecto exista
        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));

        // Obtenemos los hitos asociados al proyecto usando el DAO y los convertimos a DTO
        List<HitosProyecto> hitos = hitoDAO.obtenerHitosxProyecto(proyectoId);
        return hitos.stream()
                .map(hitoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public HitosProyecto actualizarHito(HitosProyecto hito) {
        // Validamos que el hito exista
        if (!hitoRepository.existsById(hito.getHitoId())) {
            throw new ResourceNotFoundException("Hito no encontrado");
        }
        // Actualizamos el hito usando el DAO y lo retornamos
        return hitoDAO.actualizarHito(hito);
    }

    public void eliminarHito(HitosProyecto hito) {
        // Validamos que el hito exista
        if (!hitoRepository.existsById(hito.getHitoId())) {
            throw new ResourceNotFoundException("Hito no encontrado");
        }
        // Eliminamos el hito usando el DAO
        hitoDAO.eliminarHito(hito);
    }

    public List<HitosProyectoDTO> obtenerHitosxProyecto(Long idProyecto) {
        // Validamos que el proyecto exista
        proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        // Obtenemos los hitos asociados al proyecto usando el DAO y los convertimos a DTO
        List<HitosProyecto> hitos = hitoDAO.obtenerHitosxProyecto(idProyecto);
        return hitos.stream()
                .map(hitoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void eliminarHitoById(Long hitoId) {
        // Validamos que el hito exista
        if (!hitoRepository.existsById(hitoId)) {
            throw new ResourceNotFoundException("Hito no encontrado");
        }
        // Eliminamos el hito usando el DAO
        hitoDAO.eliminarHitoxId(hitoId);
    }

    public HitosProyectoDTO actualizarHitoById(Long id, HitosProyectoDTO dto) {
        // Validamos que el hito exista y obtenemos la entidad
        HitosProyecto existing = hitoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hito no encontrado"));
        // Actualizamos campos desde el DTO ignorando valores nulos
        hitoMapper.updateHitoFromDto(dto, existing);
        // Aseguramos que el ID permanezca igual
        existing.setHitoId(id);
        // Guardamos la entidad actualizada
        HitosProyecto saved = hitoDAO.actualizarHito(existing);
        // Convertimos a DTO y retornamos
        return hitoMapper.toDTO(saved);
    }
}
