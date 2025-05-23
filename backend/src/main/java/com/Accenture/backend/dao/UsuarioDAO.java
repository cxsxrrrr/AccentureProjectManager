package com.Accenture.backend.dao;

import com.Accenture.backend.model.Usuario;

import java.util.List;
import java.util.Optional;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN UsuarioDAOImpl
 * */

public interface UsuarioDAO {
    Usuario crearUsuario(Usuario usuario);
    Usuario actualizarUsuario(Usuario usuario);
    void eliminarUsuario(Usuario usuario);
    Usuario buscarUsuarioxId(Long usuarioId);
    List<Usuario> obtenerUsuarios();
    Optional<Usuario> buscarUsuarioxCedula(Long cedula);
}
