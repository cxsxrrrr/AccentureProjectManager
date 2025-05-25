package com.Accenture.backend.dao;

import com.Accenture.backend.model.HitosProyecto;

import java.util.List;

public interface HitosProyectoDAO {
    HitosProyecto guardarHito(HitosProyecto hito);
    HitosProyecto actualizarHito(HitosProyecto hito);
    void eliminarHito(HitosProyecto hito);
    void eliminarHitoxId(Long hitoId);
    List<HitosProyecto> obtenerHitosxProyecto(Long idProyecto);

}
