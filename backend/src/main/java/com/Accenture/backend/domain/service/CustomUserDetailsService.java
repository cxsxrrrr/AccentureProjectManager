package com.Accenture.backend.domain.service;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.dao.UsuarioDAO;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioDAO usuarioDAO;

    public CustomUserDetailsService(UsuarioDAO usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String cedula) throws UsernameNotFoundException {
        Long cedulaLong = Long.parseLong(cedula); // Convertir la cédula a Long
        Usuario usuario = usuarioDAO.buscarUsuarioxCedula(cedulaLong)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con cédula: " + cedula));

        return User.builder()
                .username(String.valueOf(usuario.getCedula()))
                .password(usuario.getPassword()) // Contraseña encriptada
                .roles("USER") // Asignar un rol genérico temporalmente
                .build();
    }
}