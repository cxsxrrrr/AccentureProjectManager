package com.Accenture.backend.domain.dto;

import lombok.Data;

@Data
public class MiembroTareaDTO {
    private Long id;
    private Long usuarioId;
    private Long tareaId;
    private Long proyectoId;
    private Long asignadoPorId;
    private com.Accenture.backend.domain.dto.UsuarioDTO usuario;
    private com.Accenture.backend.domain.dto.TareaDTO tarea;
    private com.Accenture.backend.domain.dto.ProyectoDTO proyecto;
    private com.Accenture.backend.domain.dto.UsuarioDTO asignadoPor;
}
