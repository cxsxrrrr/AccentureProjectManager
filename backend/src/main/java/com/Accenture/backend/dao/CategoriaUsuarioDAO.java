package com.Accenture.backend.dao;

import java.util.List;
import com.Accenture.backend.model.CategoriaUsuario;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN CategoriaDAOImpl
 * */

public interface CategoriaUsuarioDAO {
    void asociarCategoriaAUsuario(Long usuarioId, Long categoriaId);
    void removerCategoriaAUsuario(Long usuarioId, Long categoriaId);
    List<CategoriaUsuario> listarPorUsuarioId(Long usuarioId);
}
