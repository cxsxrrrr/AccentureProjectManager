package com.Accenture.backend.domain.dto;

import lombok.Data;

@Data
public class MiembroTareaDTO {
    private Long id;
    private Long usuarioId;
    private Long tareaId;
    private Long proyectoId;
    private Long asignadoPorId;
}
