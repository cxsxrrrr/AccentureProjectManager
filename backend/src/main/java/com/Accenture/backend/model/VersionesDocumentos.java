package com.Accenture.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "VersionesDocumentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VersionesDocumentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long versionesDocumentosId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "documentos_id", referencedColumnName = "documentoId")
    private Documentos documentosId;

    @Column(length = 255, nullable = false)
    private String nombre;

    @Column(length = 500, nullable = false)
    private String rutaArchivo;

    @Column(length = 100, nullable = false)
    private String tipoDocumento;

    @Column(nullable = false)
    private LocalDateTime fechaSubida;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subido_por", referencedColumnName = "usuarioId")
    private Usuario subidoPor;

    @Column(length = 500)
    private String descripcion;

    @Column(length = 50)
    private String estado;

    @Column(name = "es_ultima_version", nullable = false)
    private boolean esUltimaVersion;

    @ManyToOne
    @JoinColumn(name = "tareas_id", referencedColumnName = "tareas_id")
    private Tarea tareasId;
}
