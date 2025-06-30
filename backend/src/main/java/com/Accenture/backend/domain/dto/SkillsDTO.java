package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SkillsDTO {
    private Long skillId;
    private String nombre;
    private String estado;
    private Long categoriaId;
    private String categoriaNombre;
}
