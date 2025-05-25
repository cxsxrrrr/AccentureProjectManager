package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.HistorialCambios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface HistorialCambiosRepository extends JpaRepository<HistorialCambios, Long> {
    List<HistorialCambios> findByUsuarioUsuarioId(Long usuarioId);
}
