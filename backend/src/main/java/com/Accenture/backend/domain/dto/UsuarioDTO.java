package com.Accenture.backend.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
// Datos visibles en la petición
public class UsuarioDTO {

    private Long usuarioId;
    private String nombre;
    private String apellido;
    private RolDTO rol;
    
    private Long cedula;

    private char genero;

    private LocalDate fechaNacimiento;

    private String numeroTelefono;

    private String email;

    private String password;

    private String estado;

    private LocalDateTime fechaCreacion;

    private LocalDateTime ultimoAcceso;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private int intentosLogin;


}

