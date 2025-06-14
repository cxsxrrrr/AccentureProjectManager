package com.Accenture.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.List;

/*
 * Entidad: Usuarios
 */

@Entity
@Table(name = "Usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    // Columnas

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuarioId;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String apellido;

    @Column(length = 30)
    private Long cedula;

    @Column(length = 255)
    private String numeroTelefono;

    @Column(length = 255)
    private String email;

    @Column(length = 255)
    private String password;

    @Column(length = 255)
    private String estado;

    @Column(length = 255)
    private LocalDateTime fechaCreacion;

    @Column(length = 255)
    private LocalDateTime ultimoAcceso;

    @OneToMany(mappedBy = "cliente")
    private List<Proyecto> proyectosComoCliente;

    @OneToMany(mappedBy = "gerenteProyecto")
    private List<Proyecto> proyectosComoGerente;

    @OneToMany(mappedBy = "creadoPor")
    private List<Proyecto> proyectosCreados;

}
