package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TareaDTO {

    private Long id;

    private Long proyectoId;

    private String nombre;

    private String descripcion;

    private String estado; // Puede ser: "NO_INICIADA", "EN_PROGRESO", "COMPLETADA", "BLOQUEADA"

    private String prioridad; // Puede ser: "ALTA", "MEDIA", "BAJA"

    private LocalDate fechaInicioEstimada;

    private LocalDate fechaFinEstimada;

    private LocalDate fechaInicioReal;

    private LocalDate fechaFinReal;

    private BigDecimal peso;

    private Long creadoPorId;

    private LocalDateTime fechaCreacion;

    private LocalDateTime ultimaActualizacion;
}
