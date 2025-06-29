package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Datos visibles en la petición
public class CategoriaDTO {
    private Long categoriaId;
    private String nombre;
    private String estado;
    private String descripcion;
}
