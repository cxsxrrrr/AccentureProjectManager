package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursosProyectoDTO {
    private Long recursosProyectoId;
    private Long recursoId;
    private Long proyectoId;
    private Float cantidadAsignada;
    private LocalDateTime fechaAsignacion;
    private LocalDateTime fechaLiberacion;
    private Float costoTotal;
    private Long asignadoPor;
}
