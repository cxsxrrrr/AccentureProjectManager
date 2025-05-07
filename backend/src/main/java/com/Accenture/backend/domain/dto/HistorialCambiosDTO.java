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
// Datos visibles en la petición
public class HistorialCambiosDTO {

    private String entidadTipo;
    private String Campo_modificado;
    private String valorAnterior;
    private String valorNuevo;
    private LocalDateTime fechaCambio;
    private String descripcionCambio;
    private UsuarioDTO usuario;
}
