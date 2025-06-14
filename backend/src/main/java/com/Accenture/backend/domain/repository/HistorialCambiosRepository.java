package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.HistorialCambios;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface HistorialCambiosRepository extends JpaRepository<HistorialCambios, Long> {

}
