package com.Accenture.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "RecursosProyecto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursosProyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recursosProyectoId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "recurso_id", referencedColumnName = "recursoId")
    private Recurso recursoId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "proyecto_id", referencedColumnName = "proyectoId")
    private Proyecto proyectoId;

    @Column(nullable = false)
    private Float cantidadAsignada;

    @Column(nullable = false)
    private LocalDateTime fechaAsignacion;

    private LocalDateTime fechaLiberacion;

    @Column(nullable = false)
    private Float costoTotal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "asignado_por", referencedColumnName = "usuarioId")
    private Usuario asignadoPor;
}
