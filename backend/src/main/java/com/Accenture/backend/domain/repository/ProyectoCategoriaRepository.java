package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.ProyectoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProyectoCategoriaRepository extends JpaRepository<ProyectoCategoria, Long> {

    // Filtrar por proyecto.proyectoId
    List<ProyectoCategoria> findByProyecto_ProyectoId(Long proyectoId);

    // Si quieres buscar por nombre de proyecto (contiene, ignorando case)
    List<ProyectoCategoria> findByProyecto_NombreProyectoContainingIgnoreCase(String nombreProyecto);

    // Filtrar por categoria.categoriaId
    List<ProyectoCategoria> findByCategoria_CategoriaId(Long categoriaId);

    // Combinado proyecto y categoría
    Optional<ProyectoCategoria> findByProyecto_ProyectoIdAndCategoria_CategoriaId(Long proyectoId, Long categoriaId);

    // Borrar la relación
    void deleteByProyecto_ProyectoIdAndCategoria_CategoriaId(Long proyectoId, Long categoriaId);
}