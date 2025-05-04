package com.Accenture.backend.dao;

import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProyectoDAOImpl implements ProyectoDAO {
    private final ProyectoRepository proyectoRepository;

    public ProyectoDAOImpl(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    @Transactional
    @Override
    public Proyecto guardarProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    @Transactional
    @Override
    public Proyecto actualizarProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    @Transactional
    @Override
    public void eliminarProyecto(Proyecto proyecto) {
        proyectoRepository.delete(proyecto);
    }

    @Override
    public Proyecto buscarProyectoxId(Long idProyecto) {
        return proyectoRepository.findById(idProyecto).orElse(null);
    }

    @Override
    public List<Proyecto> obtenerProyectos() {
        return proyectoRepository.findAll();
    }
}
