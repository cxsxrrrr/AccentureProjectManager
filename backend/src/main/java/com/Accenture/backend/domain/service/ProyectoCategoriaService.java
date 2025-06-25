package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.ProyectoCategoriaDAO;
import com.Accenture.backend.domain.dto.ProyectoCategoriaDTO;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.ProyectoCategoria;
import com.Accenture.backend.util.ProyectoCategoriaMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProyectoCategoriaService {

    private final ProyectoCategoriaDAO proyectoCategoriaDAO;
    private final ProyectoCategoriaMapper mapper;

    public ProyectoCategoriaService(ProyectoCategoriaDAO proyectoCategoriaDAO, ProyectoCategoriaMapper mapper) {
        this.proyectoCategoriaDAO = proyectoCategoriaDAO;
        this.mapper = mapper;
    }

    // Asociar una categoría a un proyecto
    public void agregarCategoriaAProyecto(Long proyectoId, Long categoriaId) {
        proyectoCategoriaDAO.agregarCategoriaAProyecto(proyectoId, categoriaId);
    }

    // Eliminar una asociación proyecto-categoría
    public void eliminarCategoriaDeProyecto(Long proyectoId, Long categoriaId) {
        proyectoCategoriaDAO.eliminarCategoriaDeProyecto(proyectoId, categoriaId);
    }

    // Obtener todas las categorías de un proyecto
    public List<ProyectoCategoriaDTO> obtenerCategoriasPorProyecto(Long proyectoId) {
        List<ProyectoCategoria> asociaciones = proyectoCategoriaDAO.obtenerCategoriasPorProyecto(proyectoId);

        if (asociaciones.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron categorías para el proyecto con ID: " + proyectoId);
        }

        return asociaciones.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener todos los proyectos asociados a una categoría
    public List<ProyectoCategoriaDTO> obtenerProyectosPorCategoria(Long categoriaId) {
        List<ProyectoCategoria> asociaciones = proyectoCategoriaDAO.obtenerProyectosPorCategoria(categoriaId);

        if (asociaciones.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron proyectos para la categoría con ID: " + categoriaId);
        }

        return asociaciones.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}
