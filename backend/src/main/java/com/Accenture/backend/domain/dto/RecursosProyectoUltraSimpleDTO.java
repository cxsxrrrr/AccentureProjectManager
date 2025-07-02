package com.Accenture.backend.domain.dto;

import com.Accenture.backend.model.Recurso;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursosProyectoUltraSimpleDTO {
    private Long recursosProyectoId;
    private Recurso recurso;
    private ProyectoSimpleDTO proyecto;
}
