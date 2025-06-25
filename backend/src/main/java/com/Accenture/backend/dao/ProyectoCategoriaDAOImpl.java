package com.Accenture.backend.dao;

import com.Accenture.backend.model.ProyectoCategoria;
import com.Accenture.backend.domain.repository.ProyectoCategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Categoria;

import java.util.List;

@Repository
public class ProyectoCategoriaDAOImpl implements ProyectoCategoriaDAO {

    private final ProyectoCategoriaRepository proyectoCategoriaRepository;

    @Autowired
    public ProyectoCategoriaDAOImpl(ProyectoCategoriaRepository proyectoCategoriaRepository) {
        this.proyectoCategoriaRepository = proyectoCategoriaRepository;
    }


    @Override
    public void agregarCategoriaAProyecto(Long idProyecto, Long idCategoria) {
        // Creamos una nueva relación con solo IDs, sin cargar entidades completas
        ProyectoCategoria relacion = ProyectoCategoria.builder()
                .proyecto(new Proyecto(idProyecto)) // usando constructor con solo ID
                .categoria(new Categoria(idCategoria))
                .build();

        proyectoCategoriaRepository.save(relacion);
    }

    @Transactional
    @Override
    public void eliminarCategoriaDeProyecto(Long idProyecto, Long idCategoria) {
        proyectoCategoriaRepository.deleteByProyecto_ProyectoIdAndCategoria_CategoriaId(idProyecto, idCategoria);
    }

    @Override
    public List<ProyectoCategoria> obtenerCategoriasPorProyecto(Long idProyecto) {
        return proyectoCategoriaRepository.findByProyecto_ProyectoId(idProyecto);
    }

    @Override
    public List<ProyectoCategoria> obtenerProyectosPorCategoria(Long idCategoria) {
        return proyectoCategoriaRepository.findByCategoria_CategoriaId(idCategoria);
    }
}
