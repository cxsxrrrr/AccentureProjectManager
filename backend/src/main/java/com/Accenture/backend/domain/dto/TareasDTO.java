package com.Accenture.backend.domain.dto;

import com.Accenture.backend.model.Proyecto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

// Librerias de la aplicación

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

// Datos de la Petición
public class TareasDTO {

        private Long TareaId;
        private string TareaName;
        private string TareaDescription;
        private LocalDate fechaInicio;
        private LocalDate fechaFin;
        private LocalDate fechaFinReal;
        private String Status;



}