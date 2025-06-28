package com.Accenture.backend.domain.dto;

public class UsuarioRolDTO {
    private Long id;
    private Long usuarioId;
    private Long rolId;

    // Constructor vacío
    public UsuarioRolDTO() {
    }

    // Constructor con parámetros
    public UsuarioRolDTO(Long id, Long usuarioId, Long rolId) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.rolId = rolId;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getRolId() {
        return rolId;
    }

    public void setRolId(Long rolId) {
        this.rolId = rolId;
    }
}