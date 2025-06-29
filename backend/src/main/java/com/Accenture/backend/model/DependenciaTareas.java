package com.Accenture.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DependenciaTareas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DependenciaTareas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dependenciaTareasId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tarea_id", referencedColumnName = "tareas_id")
    private Tarea tareaId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tarea_presendente", referencedColumnName = "tareas_id")
    private Tarea tareaPresendente;

    @Column(length = 50, nullable = false)
    private String tipoDependencia;
}
