package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DependenciaTareasDTO {
    private Long dependenciaTareasId;
    private Long tareaId;
    private Long tareaPresendente;
    private String tipoDependencia;
}
