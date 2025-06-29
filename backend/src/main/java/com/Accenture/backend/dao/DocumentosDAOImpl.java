package com.Accenture.backend.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.Accenture.backend.model.Documentos;
import com.Accenture.backend.domain.repository.DocumentosRepository;

@Repository
public class DocumentosDAOImpl implements DocumentosDAO {

    private final DocumentosRepository documentosRepository;

    @Autowired
    public DocumentosDAOImpl(DocumentosRepository documentosRepository) {
        this.documentosRepository = documentosRepository;
    }

    @Override
    public Documentos save(Documentos documento) {
        return documentosRepository.save(documento);
    }

    @Override
    public Optional<Documentos> findById(Long documentoId) {
        return documentosRepository.findById(documentoId);
    }

    @Override
    public List<Documentos> findAll() {
        return documentosRepository.findAll();
    }

    @Override
    public void deleteById(Long documentoId) {
        documentosRepository.deleteById(documentoId);
    }

    @Override
    public List<Documentos> findByProyectoId(Long proyectoId) {
        return documentosRepository.findByProyectoId_ProyectoId(proyectoId);
    }

    @Override
    public List<Documentos> findByNombreOriginal(String nombreOriginal) {
        return documentosRepository.findByNombreOriginal(nombreOriginal);
    }

    @Override
    public List<Documentos> findByNombreOriginalContainingIgnoreCase(String nombre) {
        return documentosRepository.findByNombreOriginalContainingIgnoreCase(nombre);
    }
}
