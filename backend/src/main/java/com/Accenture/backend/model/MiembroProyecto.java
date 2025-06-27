package com.Accenture.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "miembros_proyectos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MiembroProyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"proyectos", "hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "proyecto_id", nullable = false)
    @JsonIgnoreProperties({"miembros", "hibernateLazyInitializer", "handler"})
    private Proyecto proyecto;

    @Column(name = "fecha_asignacion")
    private LocalDate fechaAsignacion;

    @Column(name = "fecha_designacion" )
    private LocalDate fechaDesignacion;

    @Column(name = "capacidad_maxima", precision = 5, scale = 2)
    private BigDecimal capacidadMaxima;

    @Column(name = "disponibilidad")
    private Boolean disponibilidad;
    
}
