package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.ProyectoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProyectoCategoriaRepository extends JpaRepository<ProyectoCategoria, Long> {


    // Método para encontrar todas las categorías de un proyecto específico
    List<ProyectoCategoria> findByProyectoId(Long proyectoId);

    // Método para encontrar todas las categorías asociadas a un proyecto por su nombre
    List<ProyectoCategoria> findByProyectoNombre(String nombreProyecto);
}