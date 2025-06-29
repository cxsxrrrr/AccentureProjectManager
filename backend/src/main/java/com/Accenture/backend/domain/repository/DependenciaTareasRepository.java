package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.DependenciaTareas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DependenciaTareasRepository extends JpaRepository<DependenciaTareas, Long> {
    // Buscar dependencias por tarea
    List<DependenciaTareas> findByTareaId_TareasId(Long tareaId);

    // Buscar dependencias por tarea precedente
    List<DependenciaTareas> findByTareaPresendente_TareasId(Long tareaPresendenteId);

    // Buscar dependencias por tipo
    List<DependenciaTareas> findByTipoDependencia(String tipoDependencia);
}
