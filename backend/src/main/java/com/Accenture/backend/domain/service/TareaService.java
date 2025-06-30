package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.TareaDTO;

import java.util.List;

public interface TareaService {

    List<TareaDTO> listarPorProyecto(Long proyectoId);

    TareaDTO guardar(TareaDTO dto);

    List<TareaDTO> listarPorEstado(String estado);

    List<TareaDTO> listarPorPrioridad(String prioridad);

    List<TareaDTO> listarTodasLasTareas();
}
