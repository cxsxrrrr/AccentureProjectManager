package com.Accenture.backend.dao;

import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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
        proyectoRepository.deleteByProyectoId(proyecto.getProyectoId());
    }

    // Elimina el proyecto de la base de datos por ID
    @Transactional
    @Override
    public void eliminarProyectoPorId(Long proyectoId) {
        proyectoRepository.deleteByProyectoId(proyectoId);
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

    @Override
    public List<Proyecto> buscarProyectosPorNombre(String nombre) {
        return proyectoRepository.findByNombreProyectoContainingIgnoreCase(nombre);
    }

    @Override
    public List<Proyecto> buscarProyectosPorEstado(String estado) {
        if (estado == null || estado.isEmpty()) {
            throw new IllegalArgumentException("El estado no puede ser nulo o vacío");
        }
        return proyectoRepository.findByEstadoIgnoreCase(estado);
    }

    @Override
    public List<Proyecto> buscarProyectosPorFechaInicioEntre(LocalDate inicio, LocalDate fin) {
        if (inicio == null || fin == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin no pueden ser nulas");
        }
        return proyectoRepository.findByFechaInicioBetween(inicio, fin);
    }
}
