package com.Accenture.backend.dao;

import com.Accenture.backend.model.RecursosProyecto;
import com.Accenture.backend.domain.repository.RecursosProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class RecursosProyectoDAOImpl implements RecursosProyectoDAO {
    private final RecursosProyectoRepository repository;

    @Autowired
    public RecursosProyectoDAOImpl(RecursosProyectoRepository repository) {
        this.repository = repository;
    }

    @Override
    public RecursosProyecto save(RecursosProyecto recursoProyecto) {
        return repository.save(recursoProyecto);
    }

    @Override
    public List<RecursosProyecto> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<RecursosProyecto> findById(Long recursosProyectoId) {
        return repository.findById(recursosProyectoId);
    }

    @Override
    public void deleteById(Long recursosProyectoId) {
        repository.deleteById(recursosProyectoId);
    }

    @Override
    public RecursosProyecto update(RecursosProyecto recursoProyecto) {
        return repository.save(recursoProyecto);
    }

    @Override
    public List<RecursosProyecto> findByProyectoId(Long proyectoId) {
        return repository.findByProyectoId_ProyectoId(proyectoId);
    }

    @Override
    public List<RecursosProyecto> findByAsignadoPor(Long usuarioId) {
        return repository.findByAsignadoPor_UsuarioId(usuarioId);
    }

    @Override
    public List<RecursosProyecto> findByRecursoId(Long recursoId) {
        return repository.findByRecursoId_RecursoId(recursoId);
    }

    // public List<RecursosProyecto> findByFechaAsignacionBetween(LocalDateTime desde, LocalDateTime hasta) {
    //     throw new UnsupportedOperationException("Método eliminado: fechaAsignacion ya no existe");
    // }
}
