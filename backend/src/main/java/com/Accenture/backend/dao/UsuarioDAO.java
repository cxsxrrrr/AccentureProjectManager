package com.Accenture.backend.dao;

import com.Accenture.backend.model.Usuario;

import java.util.List;

public interface UsuarioDAO {
    Usuario crearUsuario(Usuario usuario);
    Usuario actualizarUsuario(Usuario usuario);
    void eliminarUsuario(Usuario usuario);
    Usuario buscarUsuarioxId(Long usuarioId);
    List<Usuario> obtenerUsuarios();
}
