package com.Accenture.backend.dao;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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


    @Override
    public Optional<Usuario> buscarUsuarioxCedula(Long cedula) {
        if (cedula == null) {
            throw new IllegalArgumentException("La cédula no puede ser nula");
        }
        return usuarioRepository.findByCedula(cedula);
    }

    @Override
    public List<Usuario> buscarUsuariosPorNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public Optional<Usuario> buscarUsuarioPorEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("El email no puede ser nulo o vacío");
        }
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public List<Usuario> buscarUsuariosPorEstado(String estado) {
        if (estado == null || estado.isEmpty()) {
            throw new IllegalArgumentException("El estado no puede ser nulo o vacío");
        }
        return usuarioRepository.findByEstado(estado);
    }
}
