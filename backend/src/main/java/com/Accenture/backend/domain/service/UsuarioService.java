package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.UsuarioDAO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.exception.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.util.MailSender;
import com.Accenture.backend.util.UsuarioMapper;
import com.Accenture.backend.domain.repository.RolRepository;
import com.Accenture.backend.model.Rol;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioDAO usuarioDAO;
    private final UsuarioMapper usuarioMapper;
    private final MailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;

    public UsuarioService(UsuarioDAO usuarioDAO,
                         UsuarioMapper usuarioMapper,
                         MailSender mailSender,
                         PasswordEncoder passwordEncoder,
                         RolRepository rolRepository) {
        this.usuarioDAO = usuarioDAO;
        this.usuarioMapper = usuarioMapper;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
    }

    public UsuarioDTO crearUsuario(UsuarioDTO dto) {
        // Validate and set role
        if (dto.getRol() == null || dto.getRol().getRolId() == null) {
            throw new IllegalArgumentException("rolId es requerido");
        }
        // Verificar si la cédula ya existe
        if (usuarioDAO.buscarUsuarioxCedula(dto.getCedula()).isPresent()) {
            throw new IllegalArgumentException("La cédula ya está registrada");
        }

        if (usuarioDAO.buscarUsuarioPorEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado");
        }

        if (usuarioDAO.buscarUsuarioPorEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado");
        }

        if (usuarioDAO.buscarUsuarioxTelefono(dto.getNumeroTelefono()).isPresent()) {
            throw new IllegalArgumentException("El numero de telefono ya está registrado");
        }

        // UsuarioDTO a Usuario
        Usuario usuario = usuarioMapper.toEntity(dto);
        // Assign role entity
        Long rolId = dto.getRol().getRolId();
        Rol rol = rolRepository.findById(rolId)
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado con id: " + rolId));
        usuario.setRol(rol);

        // Guardar usuario en la base de datos con contraseña encriptada
        final String rawPassword = dto.getPassword(); // Guardar la contraseña en texto plano para el correo
        // Guardar usuario en la base de datos con contraseña encriptada
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario = usuarioDAO.crearUsuario(usuario);

        final Usuario savedUsuario = usuarioDAO.crearUsuario(usuario);

        // Enviar correo de bienvenida de forma asíncrona
        CompletableFuture.runAsync(() -> {
            mailSender.sendWelcomeEmail(savedUsuario.getEmail(), String.valueOf(savedUsuario.getCedula()), rawPassword);
        });

        // Se convierte a DTO otra vez
        return usuarioMapper.toDTO(savedUsuario);
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

    // Eliminar Usuario por Id
    public void eliminarUsuario(Long usuarioId) {
        Usuario usuario = Optional.ofNullable(usuarioDAO.buscarUsuarioxId(usuarioId))
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        usuarioDAO.eliminarUsuario(usuario);
    }

    // Actualizar Usuario por Id
    public UsuarioDTO actualizarUsuarioxId(Long usuarioId, UsuarioDTO dto) {
        Usuario usuarioExistente = Optional.ofNullable(usuarioDAO.buscarUsuarioxId(usuarioId))
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        usuarioMapper.updateUsuarioFromDto(dto, usuarioExistente);
        // Update role if provided
        if (dto.getRol() != null && dto.getRol().getRolId() != null) {
            Rol rol = rolRepository.findById(dto.getRol().getRolId())
                    .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado con id: " + dto.getRol().getRolId()));
            usuarioExistente.setRol(rol);
        }
        Usuario updated = usuarioDAO.actualizarUsuario(usuarioExistente);
        return usuarioMapper.toDTO(updated);
    }

    // Normalizar texto (remover acentos y case-insensitive)
    private String normalize(String text) {
        if (text == null) return "";
        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
        return normalized.replaceAll("\\p{M}", "").toUpperCase();
    }

    // Búsqueda de Usuarios por nombre (case & accent insensitive)
    public List<UsuarioDTO> buscarUsuariosPorNombre(String nombre) {
        String term = normalize(nombre);
        return usuarioDAO.obtenerUsuarios().stream()
                .filter(u -> normalize(u.getNombre()).contains(term))
                .map(usuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Búsqueda de Usuario por email
    public UsuarioDTO buscarUsuarioPorEmail(String email) {
        Usuario usuario = usuarioDAO.buscarUsuarioPorEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + email));
        return usuarioMapper.toDTO(usuario);
    }

    // Búsqueda de Usuarios por estado (case & accent insensitive)
    public List<UsuarioDTO> buscarUsuariosPorEstado(String estado) {
        String term = normalize(estado);
        return usuarioDAO.obtenerUsuarios().stream()
                .filter(u -> normalize(u.getEstado()).contains(term))
                .map(usuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

}
