package com.Accenture.backend.dao;

import com.Accenture.backend.model.DependenciaTareas;
import java.util.List;
import java.util.Optional;

public interface DependenciaTareasDAO {
    DependenciaTareas save(DependenciaTareas dependencia);
    List<DependenciaTareas> findAll();
    Optional<DependenciaTareas> findById(Long dependenciaTareasId);
    void deleteById(Long dependenciaTareasId);
    DependenciaTareas update(DependenciaTareas dependencia);

    // Métodos adicionales
    List<DependenciaTareas> findByTareaId(Long tareaId);
    List<DependenciaTareas> findByTareaPresendente(Long tareaPresendenteId);
    List<DependenciaTareas> findByTipoDependencia(String tipoDependencia);
}
