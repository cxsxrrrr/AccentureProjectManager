package com.Accenture.backend.domain.dto;

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
    private UsuarioDTO cliente;
    private UsuarioDTO gerenteProyecto;
    private UsuarioDTO creadoPor;
    private LocalDateTime fechaCreacion;
}

