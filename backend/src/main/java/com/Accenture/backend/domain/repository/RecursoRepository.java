package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

// Repositorio de funciones Standard para manipular la Base de Datos pq sino explota el sistema
public interface RecursoRepository extends JpaRepository<Recurso, Long> {
    // Métodos de búsqueda personalizados
    List<Recurso> findByNombreRecursoContainingIgnoreCase(String nombre);
    List<Recurso> findByDisponibilidadIgnoreCase(String disponibilidad);

    // Búsqueda por disponibilidad parcial (case-insensitive)
    List<Recurso> findByDisponibilidadContainingIgnoreCase(String disponibilidad);
}