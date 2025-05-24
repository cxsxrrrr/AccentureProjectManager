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

@Entity
@Table(name = "Hitos_Proyecto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HitosProyecto {
    // Columnas

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hitoId;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    private LocalDate fechaPlaneada;

    private LocalDate fechaReal;

    private String estado;

    @ManyToOne
    @JoinColumn(name = "proyecto_id", referencedColumnName = "proyectoId")
    private Proyecto proyecto;
}
