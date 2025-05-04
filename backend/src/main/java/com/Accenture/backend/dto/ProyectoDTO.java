package com.Accenture.backend.dto;

import com.Accenture.backend.model.Usuario;


import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProyectoDTO {

    private Long proyectoId;
    private String nombreTitulo;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDate fechaFinReal;
    private String estado;

    private Usuario cliente;
    private Usuario gerenteProyecto;
    private Usuario creadoPor;

    private LocalDateTime fechaCreacion;
}

