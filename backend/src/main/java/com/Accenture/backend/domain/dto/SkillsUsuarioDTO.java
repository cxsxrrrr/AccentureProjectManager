package com.Accenture.backend.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillsUsuarioDTO {
    private Long skillUsuarioId;
    private Long skillId;
    private Long usuarioId;
}
