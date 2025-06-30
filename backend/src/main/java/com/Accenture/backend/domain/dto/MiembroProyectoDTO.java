package com.Accenture.backend.domain.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class MiembroProyectoDTO {
    private Long id;
    private Long usuarioId;
    private Long proyectoId;
    private com.Accenture.backend.domain.dto.ProyectoDTO proyecto;
    private LocalDate fechaAsignacion;
    private LocalDate fechaDesignacion;
    private BigDecimal capacidadMaxima;
    private Boolean disponibilidad;
}
