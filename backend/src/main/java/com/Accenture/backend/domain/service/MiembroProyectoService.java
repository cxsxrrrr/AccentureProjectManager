package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.MiembroProyectoDTO;


import java.util.List;

public interface MiembroProyectoService {
    MiembroProyectoDTO guardar(MiembroProyectoDTO dto);

    List<MiembroProyectoDTO> listarPorProyecto(Long proyectoId);

    List<MiembroProyectoDTO> listarPorUsuario(Long usuarioId);
}
