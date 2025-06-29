package com.Accenture.backend.dao;
import java.util.List;
import java.util.Optional;
import com.Accenture.backend.model.Documentos;

public interface DocumentosDAO {
    Documentos save(Documentos documento);
    Optional<Documentos> findById(Long documentoId);
    List<Documentos> findAll();
    void deleteById(Long documentoId);

    // Métodos adicionales según el repositorio
    List<Documentos> findByProyectoId(Long proyectoId);
    List<Documentos> findByNombreOriginal(String nombreOriginal);
    List<Documentos> findByNombreOriginalContainingIgnoreCase(String nombre);
}
