package com.Accenture.backend.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
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
    /**
     * Allows deserialization from a single numeric value for rolId.
     */
    @JsonCreator
    public static RolDTO fromId(@JsonProperty("rol") Long rolId) {
        RolDTO dto = new RolDTO();
        dto.setRolId(rolId);
        return dto;
    }

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