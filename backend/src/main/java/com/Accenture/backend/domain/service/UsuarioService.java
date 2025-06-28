package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.UsuarioDAO;

import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.exception.ResourceNotFoundException;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.util.UsuarioMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioDAO usuarioDAO;
    private final UsuarioMapper usuarioMapper;

    public UsuarioService(UsuarioDAO usuarioDAO, UsuarioMapper usuarioMapper) {
        this.usuarioDAO = usuarioDAO;
        this.usuarioMapper = usuarioMapper;
    }

public UsuarioDTO crearUsuario(UsuarioDTO dto) {
    // UsuarioDTO a Usuario
    Usuario usuario = usuarioMapper.toEntity(dto);

    // Validar y obtener el rol
    if (dto.getRolUsuario() != null && dto.getRolUsuario().getRolId() != null) {
        Rol rol = rolRepository.findById(dto.getRolUsuario().getRolId())
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
        usuario.setRol(rol);
    }

    // Guardar usuario en la base de datos
    usuario = usuarioDAO.crearUsuario(usuario);

    // Se convierte a DTO otra vez
    return usuarioMapper.toDTO(usuario);
}

    // Obtienes un Usuario por Id
    public UsuarioDTO obtenerUsuarioxId(Long usuarioId) {
        Usuario usuario = Optional.ofNullable(usuarioDAO.buscarUsuarioxId(usuarioId))
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return usuarioMapper.toDTO(usuario);
    }
    // Obtienes todos los Usuarios
    public List<UsuarioDTO> obtenerUsuarios() {
        return usuarioDAO.obtenerUsuarios().stream()
                .map(usuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Eliminas un Usuario por Id
    public void eliminarUsuario(Long usuarioId) {
    Usuario usuario = Optional.ofNullable(usuarioDAO.buscarUsuarioxId(usuarioId))
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));
        usuarioDAO.eliminarUsuario(usuario);
    }

    // Actualizas un Usuario por Id
    public UsuarioDTO actualizarUsuarioxId(Long usuarioId, UsuarioDTO dto) {
        Usuario existing = Optional.ofNullable(usuarioDAO.buscarUsuarioxId(usuarioId))
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        // vuelca sólo los campos no nulos de dto sobre existing
        usuarioMapper.updateUsuarioFromDto(dto, existing);
        Usuario saved = usuarioDAO.actualizarUsuario(existing);
        return usuarioMapper.toDTO(saved);
    }

}
