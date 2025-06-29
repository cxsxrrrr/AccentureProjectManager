package com.Accenture.backend.dao;

import com.Accenture.backend.model.Recurso;
import com.Accenture.backend.domain.repository.RecursoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecursoDAOImpl implements RecursoDAO {
    private final RecursoRepository recursoRepository;

    // Constructor básico
    public RecursoDAOImpl(RecursoRepository recursoRepository) {
        this.recursoRepository = recursoRepository;
    }


    // Crea el recurso en la Base De Datos
    @Transactional
    @Override
    public Recurso guardarRecurso(Recurso recurso) {
        // REPOSITORIO DE FUNCIONES STANDARD
        return recursoRepository.save(recurso);
    }

    // Guarda el recurso actualizado en la base de datos
    @Transactional
    @Override
    public Recurso actualizarRecurso(Recurso recurso) {
        return recursoRepository.save(recurso);
    }

    // Elimina el recurso de la base de datos
    @Transactional
    @Override
    public void eliminarRecurso(Recurso recurso) {
        recursoRepository.delete(recurso);
    }

    // Busca el recurso en la base de datos x ID
    @Override
    public Recurso buscarRecursoxId(Long idRecurso) {
        return recursoRepository.findById(idRecurso).orElse(null);
    }

    // Busca los recursos por nombres
    @Override
    public List<Recurso> buscarRecursosPorNombre(String nombre) {
        return recursoRepository.findByNombreRecursoContainingIgnoreCase(nombre);
    }

    // Busca los recursos por estado
    @Override
    public List<Recurso> buscarRecursosPorEstado(String estado) {
        if (estado == null || estado.isEmpty()) {
            throw new IllegalArgumentException("El estado no puede ser nulo o vacío");
        }
        return recursoRepository.findByDisponibilidadIgnoreCase(estado);
    }


    // Obtener una lista con los recursos
    @Override
    public List<Recurso> obtenerRecursos() {
        return recursoRepository.findAll();
    }

    // Eliminar recurso por ID directamente
    @Transactional
    @Override
    public void eliminarRecursoxID(Long recursoId) {
        recursoRepository.deleteById(recursoId);
    }
}