package com.Accenture.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Documentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Documentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentoId;

    @Column(length = 255, nullable = false)
    private String nombreOriginal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "proyecto_id", referencedColumnName = "proyectoId")
    private Proyecto proyectoId;
}
