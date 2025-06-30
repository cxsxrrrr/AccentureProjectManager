package com.Accenture.backend.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaUsuarioDTO {
    private Long usuarioId;
    private Long categoriaId;
    private String experiencia;
}