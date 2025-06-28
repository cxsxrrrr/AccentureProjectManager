package com.Accenture.backend.dao;

import com.Accenture.backend.model.Recurso;

import java.time.LocalDate;
import java.util.List;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN RecursoDAOImpl
 * */

public interface RecursoDAO {
    Recurso guardarRecurso(Recurso recurso);
    Recurso actualizarRecurso(Recurso recurso);
    void eliminarRecurso(Recurso recurso);
    Recurso buscarRecursoxId(Long idRecurso);
    List<Recurso> obtenerRecursos();


    // Funciones de búsqueda adicionales
    List<Recurso> buscarRecursosPorNombre(String nombre);
    List<Recurso> buscarRecursosPorEstado(String estado);

    // Eliminar proyecto por Id directamente
    void eliminarRecursoxID(Long recursoId);
}