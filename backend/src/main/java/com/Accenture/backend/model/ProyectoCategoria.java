package com.Accenture.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;



@Entity
@Table(name = "Proyecto_Categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProyectoCategoria {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProyectoCategoria;

    @ManyToOne
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
}
