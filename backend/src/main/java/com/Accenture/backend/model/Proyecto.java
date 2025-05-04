package com.Accenture.backend.model;

import com.Accenture.backend.model.Usuario;

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

@Entity
@Table(name = "Proyectos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proyecto {

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
    
    @ManyToOne
    @JoinColumn(name = "usuarioId", referencedColumnName = "usuarioId")
    private Usuario cliente; //deberia ser Usuario

    @ManyToOne
    @JoinColumn(name = "gerente_proyecto", referencedColumnName = "usuarioId")
    private Usuario gerenteProyecto;



    @ManyToOne
    @JoinColumn(name = "creado_por", referencedColumnName = "usuarioId")
    private Usuario creadoPor;


}
