package com.Accenture.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryUsersResponseDTO {
    private Long categoriaId;
    private String nombre;
    private List<UsuarioDTO> usuarios;
}
