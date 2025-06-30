package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursosProyectoDTO {
    private Long recursosProyectoId;
    private Long recursoId;
    private Long proyectoId;
    private Long asignadoPor;
}
