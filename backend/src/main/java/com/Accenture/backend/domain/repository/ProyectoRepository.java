package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {

}
