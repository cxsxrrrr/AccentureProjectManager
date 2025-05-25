package com.Accenture.backend.domain.dto;

import com.Accenture.backend.model.Proyecto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HitosProyectoDTO {
    private Long hitoId;
    private String nombre;
    private String descripcion;
    private LocalDate fechaPlaneada;
    private LocalDate fechaReal;
    private String estado;
    private ProyectoDTO proyecto;
}
