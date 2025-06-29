package com.Accenture.backend.dao;

import com.Accenture.backend.model.DependenciaTareas;
import com.Accenture.backend.domain.repository.DependenciaTareasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class DependenciaTareasDAOImpl implements DependenciaTareasDAO {
    private final DependenciaTareasRepository repository;

    @Autowired
    public DependenciaTareasDAOImpl(DependenciaTareasRepository repository) {
        this.repository = repository;
    }

    @Override
    public DependenciaTareas save(DependenciaTareas dependencia) {
        return repository.save(dependencia);
    }

    @Override
    public List<DependenciaTareas> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<DependenciaTareas> findById(Long dependenciaTareasId) {
        return repository.findById(dependenciaTareasId);
    }

    @Override
    public void deleteById(Long dependenciaTareasId) {
        repository.deleteById(dependenciaTareasId);
    }

    @Override
    public DependenciaTareas update(DependenciaTareas dependencia) {
        return repository.save(dependencia);
    }

    @Override
    public List<DependenciaTareas> findByTareaId(Long tareaId) {
        return repository.findByTareaId_TareasId(tareaId);
    }

    @Override
    public List<DependenciaTareas> findByTareaPresendente(Long tareaPresendenteId) {
        return repository.findByTareaPresendente_TareasId(tareaPresendenteId);
    }

    @Override
    public List<DependenciaTareas> findByTipoDependencia(String tipoDependencia) {
        return repository.findByTipoDependencia(tipoDependencia);
    }
}
