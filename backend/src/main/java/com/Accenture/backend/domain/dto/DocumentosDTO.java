package com.Accenture.backend.domain.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentosDTO {
    private Long documentoId;
    private String nombreOriginal;
    private Long proyectoId;
}
