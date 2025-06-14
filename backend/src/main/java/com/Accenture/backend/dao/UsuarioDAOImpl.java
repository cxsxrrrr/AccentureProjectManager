package com.Accenture.backend.dao;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsuarioDAOImpl implements UsuarioDAO {
    private final UsuarioRepository usuarioRepository;

    // Constructor
    public UsuarioDAOImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // Crea Usuario en la Base de Datos
    @Transactional
    @Override
    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Guarda Usuario en la Base de Datos
    @Transactional
    @Override
    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Elimina Usuario en la base de datos
    @Transactional
    @Override
    public void eliminarUsuario(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }

    // Busca el Usuario en la Base de Datos por Id
    @Override
    public Usuario buscarUsuarioxId(Long idUsuario) {
        return usuarioRepository.findById(idUsuario).orElse(null);
    }

    // Obtener todos los Usuarios
    @Override
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }



}
