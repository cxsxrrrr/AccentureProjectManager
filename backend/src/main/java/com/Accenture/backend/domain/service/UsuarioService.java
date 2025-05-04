package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.UsuarioDAO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.util.UsuarioMapper;
import org.springframework.stereotype.Service;

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

        // Guardar usuario en la base de datos
        usuario = usuarioDAO.crearUsuario(usuario);

        // Se convierte a DTO otra vez
        return usuarioMapper.toDTO(usuario);
    }

}
