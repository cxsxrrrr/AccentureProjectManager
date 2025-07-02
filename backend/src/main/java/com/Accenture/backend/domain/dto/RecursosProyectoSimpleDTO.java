package com.Accenture.backend.domain.dto;

import com.Accenture.backend.model.Recurso;
import com.Accenture.backend.model.Proyecto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursosProyectoSimpleDTO {
    private Long recursosProyectoId;
    private Recurso recurso;
    private Proyecto proyecto;
}
