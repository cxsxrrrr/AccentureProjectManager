package com.Accenture.backend.dao;

import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProyectoDAOImpl implements ProyectoDAO {
    private final ProyectoRepository proyectoRepository;

    // Constructor
    public ProyectoDAOImpl(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    // Crea el proyecto en la Base De Datos
    @Transactional
    @Override
    public Proyecto guardarProyecto(Proyecto proyecto) {
        // REPOSITORIO DE FUNCIONES STANDARD
        return proyectoRepository.save(proyecto);
    }

    // Guarda el proyecto actualizado en la base de datos
    @Transactional
    @Override
    public Proyecto actualizarProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    // Elimina el proyecto de la base de datos
    @Transactional
    @Override
    public void eliminarProyecto(Proyecto proyecto) {
        proyectoRepository.delete(proyecto);
    }

    // Busca el proyecto en la base de datos Por Id
    @Override
    public Proyecto buscarProyectoxId(Long idProyecto) {
        return proyectoRepository.findById(idProyecto).orElse(null);
    }

    // Obtener una lista con los proyectos
    @Override
    public List<Proyecto> obtenerProyectos() {
        return proyectoRepository.findAll();
    }
}
