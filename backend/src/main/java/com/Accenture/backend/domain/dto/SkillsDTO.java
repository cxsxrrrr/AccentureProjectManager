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
    private Long categoriaId;
}
