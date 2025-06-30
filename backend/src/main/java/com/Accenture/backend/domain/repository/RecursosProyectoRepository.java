package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.RecursosProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RecursosProyectoRepository extends JpaRepository<RecursosProyecto, Long> {
    // Buscar recursos asignados a un proyecto
    List<RecursosProyecto> findByProyectoId_ProyectoId(Long proyectoId);

    // Buscar recursos asignados por un usuario
    List<RecursosProyecto> findByAsignadoPor_UsuarioId(Long usuarioId);

    // Buscar recursos por recursoId
    List<RecursosProyecto> findByRecursoId_RecursoId(Long recursoId);

    // Buscar recursos asignados en un rango de fechas
    // List<RecursosProyecto> findByFechaAsignacionBetween(LocalDateTime desde, LocalDateTime hasta);
}
