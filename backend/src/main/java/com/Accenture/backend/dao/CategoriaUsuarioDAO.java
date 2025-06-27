package com.Accenture.backend.dao;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN CategoriaDAOImpl
 * */

public interface CategoriaUsuarioDAO {
    void asociarCategoriaAUsuario(Long usuarioId, Long categoriaId);
    void removerCategoriaAUsuario(Long usuarioId, Long categoriaId);
}
