package com.Accenture.backend.dao;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN HistorialCambiosDAOImpl
 * */

import com.Accenture.backend.model.HistorialCambios;

import java.util.List;

public interface HistorialCambiosDAO {
    HistorialCambios guardarCambio(HistorialCambios historial);
    List<HistorialCambios> mostrarCambiosxUsuarioId(Long usuarioId);
    List<HistorialCambios> mostrarCambios();
}
