package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VersionesDocumentosDTO {
    private Long versionesDocumentosId;
    private Long documentosId;
    private String nombre;
    private String rutaArchivo;
    private String tipoDocumento;
    private LocalDateTime fechaSubida;
    private Long subidoPor;
    private String descripcion;
    private String estado;
    private boolean es_ultima_version;
    private Long tareasId;
}
