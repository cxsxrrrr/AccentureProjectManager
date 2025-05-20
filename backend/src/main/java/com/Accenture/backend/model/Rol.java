package com.Accenture.backend.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles") 
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_id")
    private Long rolId;

    @Column(name = "nombre", nullable = false, unique = true)
    private String nombre;

    // Relación con UsuarioRol (uno a muchos)
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UsuarioRol> usuarios = new HashSet<>();

    // Relación con RolPermiso (uno a muchos) 
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RolPermiso> permisos = new HashSet<>();

    // Constructores
    public Rol() {
    }

    public Rol(String nombre) {
        this.nombre = nombre;
    }

    // Getters y Setters
    public Long getRolId() {
        return rolId;
    }

    public void setRolId(Long rolId) {
        this.rolId = rolId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<UsuarioRol> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<UsuarioRol> usuarios) {
        this.usuarios = usuarios;
    }

    public Set<RolPermiso> getPermisos() {
        return permisos;
    }

    public void setPermisos(Set<RolPermiso> permisos) {
        this.permisos = permisos;
    }
}