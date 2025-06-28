package com.Accenture.backend.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    //JsonProperty para no mostrar datos delicados en la peticion
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long cedula;

    private char genero;

    private LocalDate fechaNacimiento;

    private String numeroTelefono;

    private String email;

    private String password;

    private String estado;

    private LocalDateTime fechaCreacion;

    private LocalDateTime ultimoAcceso;


}

