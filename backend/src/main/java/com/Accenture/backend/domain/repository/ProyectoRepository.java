package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    // Métodos de búsqueda personalizados
    List<Proyecto> findByNombreProyectoContainingIgnoreCase(String nombre);
    List<Proyecto> findByEstadoIgnoreCase(String estado);
    List<Proyecto> findByFechaInicioBetween(LocalDate fechaInicio, LocalDate fechaFin);

    @Modifying
    @Query("DELETE FROM Proyecto p WHERE p.proyectoId = :id")
    void deleteByProyectoId(@Param("id") Long id);
}
