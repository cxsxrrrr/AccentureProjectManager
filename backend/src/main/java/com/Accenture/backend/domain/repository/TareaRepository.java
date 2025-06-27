package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {

    // Buscar todas las tareas de un proyecto
    List<Tarea> findByProyecto_ProyectoId(Long proyectoId);

    // Buscar todas las tareas creadas por un usuario
    List<Tarea> findByCreadoPor_UsuarioId(Long usuarioId);

    // Buscar tareas por estado (enum)
    List<Tarea> findByEstado(Tarea.EstadoTarea estado);

    // Buscar tareas por prioridad (enum)
    List<Tarea> findByPrioridad(Tarea.PrioridadTarea prioridad);
}
