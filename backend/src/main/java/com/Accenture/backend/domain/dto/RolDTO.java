package com.Accenture.backend.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RolDTO {
    private Long rolId;
    private String nombre;
    private String estado;
    private String descripcion;

    public void setId(Long id) {
        this.rolId = id;
    }

    public Long getId() {
        return this.rolId;
    }
}