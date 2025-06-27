package com.Accenture.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;


@Entity
@Table(name = "miembro_tarea")
@Data
@NoArgsConstructor
public class MiembroTarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "miembro_tarea_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "tarea_id", nullable = false)
    private Tarea tarea;

    @ManyToOne
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "asignado_por_id")
    private Usuario asignadoPor;

    public MiembroTarea(Usuario usuario, Tarea tarea, Proyecto proyecto) {
        this.usuario = usuario;
        this.tarea = tarea;
        this.proyecto = proyecto;
    }
}
