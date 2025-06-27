package com.Accenture.backend.domain.dto;

import com.Accenture.backend.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaUsuarioDTO {
    private Long categoriaUsuarioId;
    private Usuario usuario;
    private String experiencia;
}
