package com.Accenture.backend.dao;

import com.Accenture.backend.model.HitosProyecto;

import java.util.List;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN HitosProyectoDAOImpl
 * */

public interface HitosProyectoDAO {
    HitosProyecto guardarHito(HitosProyecto hito);
    HitosProyecto actualizarHito(HitosProyecto hito);
    void eliminarHito(HitosProyecto hito);
    void eliminarHitoxId(Long hitoId);
    List<HitosProyecto> obtenerHitosxProyecto(Long idProyecto);

}
