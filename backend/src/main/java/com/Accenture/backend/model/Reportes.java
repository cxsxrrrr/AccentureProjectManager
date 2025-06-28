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

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

/*
 * Entidad: Recursos
 */

@Entity
@Table(name = "reportes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reportes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reporte_id")
    private Long reporteId;

    @Column(name = "nombre", length = 255, nullable = false)
    private String nombre;

    @Column(name = "tipo_reporte", length = 100)
    private String tipoReporte;

    @Column(name = "fecha_generado")
    private LocalDateTime fechaGenerado;

    @ManyToOne
    @JoinColumn(name = "generado_por_id", nullable = false)
    private Usuario generadoPor;

    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private Proyecto proyecto;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "parametros", columnDefinition = "jsonb")
    private String parametros;

}
