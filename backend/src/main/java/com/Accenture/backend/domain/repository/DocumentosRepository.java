package com.Accenture.backend.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.Accenture.backend.model.Documentos;

@Repository
public interface DocumentosRepository extends JpaRepository<Documentos, Long> {
    // Buscar documentos por id de proyecto
    List<Documentos> findByProyectoId_ProyectoId(Long proyectoId);

    // Buscar documentos por nombre original (exacto)
    List<Documentos> findByNombreOriginal(String nombreOriginal);

    // Buscar documentos que contengan parte del nombre
    List<Documentos> findByNombreOriginalContainingIgnoreCase(String nombre);
}
