package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportesDTO {
    private Long reporteId;
    private String nombre;
    private String tipoReporte;
    private LocalDateTime fechaGenerado;
    private Long generadoPorId;
    private Long proyectoId;
    private String parametros;
}
