package com.Accenture.backend.domain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Datos visibles en la petición
public class RecursoDTO {

    private Long recursoId;
    private String nombreRecurso;
    private String descripcionRecurso;
    private String estado;
    private String coste;
    private String tipo;
    private Integer cantidad;
}