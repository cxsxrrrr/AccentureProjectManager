package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.HitosProyecto;
import com.Accenture.backend.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface HitosProyectoRepository extends JpaRepository<HitosProyecto, Long> {
    List<HitosProyecto> findByProyecto(Proyecto proyecto);
    // Fetch hitos by proyecto id
    List<HitosProyecto> findByProyectoProyectoId(Long proyectoId);
}
