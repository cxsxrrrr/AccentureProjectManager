package com.Accenture.backend.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Datos visibles en la petición
public class ProyectoDTO {

    private Long proyectoId;
    private String nombreProyecto;
    private String descripcionProyecto;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDate fechaFinReal;
    private String estado;
    private UsuarioDTO cliente;
    private UsuarioDTO gerenteProyecto;
    private UsuarioDTO creadoPor;
    private LocalDateTime fechaCreacion;
}

