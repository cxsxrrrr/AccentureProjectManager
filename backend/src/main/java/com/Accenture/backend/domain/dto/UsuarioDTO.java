package com.Accenture.backend.domain.dto;

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

    //JsonProperty para no mostrar datos delicados en la peticion
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long cedula;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String numeroTelefono;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String estado;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDateTime fechaCreacion;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDateTime ultimoAcceso;


}

