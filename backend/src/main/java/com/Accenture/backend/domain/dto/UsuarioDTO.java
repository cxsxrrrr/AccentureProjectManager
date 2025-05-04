package com.Accenture.backend.domain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsuarioDTO {

    private Long usuarioId;
    private String nombre;
    private String apellido;
    private String numeroTelefono;
    private String email;
    private String password;
    private String estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime ultimoAcceso;


}

