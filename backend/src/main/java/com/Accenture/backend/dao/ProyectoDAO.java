package com.Accenture.backend.dao;

import com.Accenture.backend.model.Proyecto;

import java.util.List;

/*
*  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
*  POSTERIORMENTE EN ProyectoDAOImpl
* */

public interface ProyectoDAO {
    Proyecto guardarProyecto(Proyecto proyecto);
    Proyecto actualizarProyecto(Proyecto proyecto);
    void eliminarProyecto(Proyecto proyecto);
    Proyecto buscarProyectoxId(Long idProyecto);
    List<Proyecto> obtenerProyectos();
}
