package com.Accenture.backend.dao;

import com.Accenture.backend.model.ProyectoCategoria;

import java.util.List;

public interface ProyectoCategoriaDAO {

    // Método para agregar una nueva categoría a un proyecto
    void agregarCategoriaAProyecto(Long idProyecto, Long idCategoria);

    // Método para eliminar una categoría de un proyecto
    void eliminarCategoriaDeProyecto(Long idProyecto, Long idCategoria);

    // Método para obtener todas las categorías asociadas a un proyecto específico
    List<ProyectoCategoria> obtenerCategoriasPorProyecto(Long idProyecto);

    // Método para obtener todos los proyectos asociados a una categoría específica
    List<ProyectoCategoria> obtenerProyectosPorCategoria(Long idCategoria);
}