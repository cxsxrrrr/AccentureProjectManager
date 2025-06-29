package com.Accenture.backend.dao;

import com.Accenture.backend.model.RecursosProyecto;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RecursosProyectoDAO {
    RecursosProyecto save(RecursosProyecto recursoProyecto);
    List<RecursosProyecto> findAll();
    Optional<RecursosProyecto> findById(Long recursosProyectoId);
    void deleteById(Long recursosProyectoId);
    RecursosProyecto update(RecursosProyecto recursoProyecto);

    // Métodos adicionales
    List<RecursosProyecto> findByProyectoId(Long proyectoId);
    List<RecursosProyecto> findByAsignadoPor(Long usuarioId);
    List<RecursosProyecto> findByRecursoId(Long recursoId);
    List<RecursosProyecto> findByFechaAsignacionBetween(LocalDateTime desde, LocalDateTime hasta);
}
