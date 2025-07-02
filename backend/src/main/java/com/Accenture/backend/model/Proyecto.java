package com.Accenture.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

/*
* Entidad: Proyectos
 */

@Entity
@Table(name = "Proyectos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proyecto {

    // Columnas

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proyectoId;

    @Column(length = 255)
    private String nombreProyecto;

    @Column(length = 255)
    private String descripcionProyecto;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private LocalDate fechaFinReal;

    @Column(length = 50)
    private String estado;


    private LocalDateTime fechaCreacion;

    // Foreign Keys

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id", referencedColumnName = "usuarioId")
    @JsonIgnore
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "gerente_proyecto_id", referencedColumnName = "usuarioId")
    private Usuario gerenteProyecto;

    @ManyToOne
    @JoinColumn(name = "creado_por_id", referencedColumnName = "usuarioId")
    private Usuario creadoPor;

    public Proyecto(Long proyectoId) {
        this.proyectoId = proyectoId;
    }
}
