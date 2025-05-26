package com.Accenture.backend.dao;

import com.Accenture.backend.domain.repository.CategoriaRepository;
import com.Accenture.backend.model.Categoria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoriaDAOImpl implements CategoriaDAO {

    private CategoriaRepository categoriaRepository;

    @Override
    public Categoria crearCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria modificarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public void eliminarCategoria(Categoria categoria) {
        categoriaRepository.delete(categoria);
    }

    @Override
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }
}
