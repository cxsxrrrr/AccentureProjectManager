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

/*
 * Entidad: Recursos
 */

@Entity
@Table(name = "Recursos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recurso {

    // Columnas

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recursoId;

    @Column(length = 255)
    private String nombreRecurso;

    @Column(length = 255)
    private String descripcionRecurso;

    @Column(length = 50)
    private String disponibilidad;

    private LocalDateTime fechaCreacion;

    @Column(length = 50)
    private String tipo;

    @Column(length = 50)
    private Double costo;

    // Foreign Keys

    @ManyToOne
    @JoinColumn(name = "proyecto_id", referencedColumnName = "proyectoId")
    private Proyecto proyecto;

    public Recurso(Long recursoId) {
        this.recursoId = recursoId;
    }
}