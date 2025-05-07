package com.Accenture.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
 * Entidad: Historial_Cambios
 */

@Entity
@Table(name = "Historial_Cambios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialCambios {
    // Columnas

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historialCambiosId;

    @Column(length = 50)
    private String entidadTipo;

    private Long entidadId;

    @Column(length = 50)
    private String Campo_modificado;

    @Column(length = 255)
    private String valorAnterior;

    @Column(length = 255)
    private String valorNuevo;

    private LocalDateTime fechaCambio;

    @Column(length = 255)
    private String descripcionCambio;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "usuarioId", nullable = false)
    private Usuario usuario;
}
