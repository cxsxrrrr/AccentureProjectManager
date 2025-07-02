package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProyectoSimpleDTO {
    private Long proyectoId;
    private String nombreProyecto;
    private String descripcionProyecto;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDate fechaFinReal;
    private String estado;
    private LocalDateTime fechaCreacion;
}
