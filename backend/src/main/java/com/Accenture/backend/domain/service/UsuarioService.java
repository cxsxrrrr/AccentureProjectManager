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
        // Ya no se requiere rol obligatorio
        // Verificar si la cédula ya existe
        if (usuarioDAO.buscarUsuarioxCedula(dto.getCedula()).isPresent()) {
            throw new IllegalArgumentException("La cédula ya está registrada");
        }

        if (usuarioDAO.buscarUsuarioPorEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado");
        }

        if (usuarioDAO.buscarUsuarioxTelefono(dto.getNumeroTelefono()).isPresent()) {
            throw new IllegalArgumentException("El numero de telefono ya está registrado");
        }

        // UsuarioDTO a Usuario
        Usuario usuario = usuarioMapper.toEntity(dto);

        // Asignar rol solo si viene en el DTO y tiene rolId
        if (dto.getRol() != null && dto.getRol().getRolId() != null) {
            Long rolId = dto.getRol().getRolId();
            Rol rol = rolRepository.findById(rolId)
                    .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado con id: " + rolId));
            usuario.setRol(rol);
        } else {
            usuario.setRol(null);
        }

        // Guardar usuario en la base de datos con contraseña encriptada
        final String rawPassword = dto.getPassword(); // Guardar la contraseña en texto plano para el correo
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario = usuarioDAO.crearUsuario(usuario);

        final Usuario savedUsuario = usuario;

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
        // Actualizar rol solo si viene en el DTO y tiene rolId
        if (dto.getRol() != null && dto.getRol().getRolId() != null) {
            Rol rol = rolRepository.findById(dto.getRol().getRolId())
                    .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado con id: " + dto.getRol().getRolId()));
            usuarioExistente.setRol(rol);
        } else {
            usuarioExistente.setRol(null);
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

    // Login con control de intentos fallidos
    public UsuarioDTO login(String email, String password) {
        Usuario usuario = usuarioDAO.buscarUsuarioPorEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + email));
        if (usuario.getEstado() != null && usuario.getEstado().equalsIgnoreCase("INACTIVO")) {
            throw new IllegalArgumentException("Usuario inactivo. Contacte al administrador.");
        }
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            // !!! Intentos fallidos
            int intentos = usuario.getIntentosLogin() + 1;
            usuario.setIntentosLogin(intentos);
            if (intentos >= 3) {
                usuario.setEstado("INACTIVO");
            }
            usuarioDAO.actualizarUsuario(usuario);
            throw new IllegalArgumentException("Credenciales incorrectas. Intentos fallidos: " + intentos);
        } else {
            // Login exitoso: resetear intentos
            usuario.setIntentosLogin(0);
            usuarioDAO.actualizarUsuario(usuario);
        }
        return usuarioMapper.toDTO(usuario);
    }

    // Control de intentos fallidos para integración con AuthController
    public void registrarIntentoLoginFallido(Long cedula) {
        Usuario usuario = usuarioDAO.buscarUsuarioxCedula(cedula)
                .orElse(null);
        if (usuario != null) {
            int intentos = usuario.getIntentosLogin() + 1;
            usuario.setIntentosLogin(intentos);
            if (intentos >= 3) {
                usuario.setEstado("INACTIVO");
            }
            usuarioDAO.actualizarUsuario(usuario);
        }
    }

    public void resetearIntentosLogin(Long cedula) {
        Usuario usuario = usuarioDAO.buscarUsuarioxCedula(cedula)
                .orElse(null);
        if (usuario != null && usuario.getIntentosLogin() > 0) {
            usuario.setIntentosLogin(0);
            usuarioDAO.actualizarUsuario(usuario);
        }
    }

    // Recuperación de contraseña: genera nueva, la envía y reactiva usuario
    public boolean recuperarPasswordPorEmail(String email) {
        Usuario usuario = usuarioDAO.buscarUsuarioPorEmail(email)
                .orElse(null);
        if (usuario == null) {
            return false;
        }
        // Generar nueva contraseña aleatoria segura
        String nuevaPassword = generarPasswordSegura();
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuario.setEstado("ACTIVO");
        usuario.setIntentosLogin(0);
        usuarioDAO.actualizarUsuario(usuario);
        // Enviar correo con la nueva contraseña
        mailSender.sendWelcomeEmail(usuario.getEmail(), String.valueOf(usuario.getCedula()), nuevaPassword);
        return true;
    }

    // Utilidad para generar contraseñas seguras
    private String generarPasswordSegura() {
        int length = 10;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
        StringBuilder sb = new StringBuilder();
        java.security.SecureRandom random = new java.security.SecureRandom();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

}
