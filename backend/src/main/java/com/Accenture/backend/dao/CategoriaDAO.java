package com.Accenture.backend.dao;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN CategoriaDAOImpl
 * */

import com.Accenture.backend.model.Categoria;

import java.util.List;
import java.util.Optional;

public interface CategoriaDAO {
    Categoria crearCategoria(Categoria categoria);
    Categoria modificarCategoria(Categoria categoria);
    void eliminarCategoria(Categoria categoria);
    List<Categoria> listarCategorias();
    Optional<Categoria> buscarCategoriaPorId(Long id);
}
