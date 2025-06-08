package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProyectoCategoriaDTO {
    private Long idProyectoCategoria;
    private ProyectoDTO proyecto;
    private CategoriaDTO categoria;
}
