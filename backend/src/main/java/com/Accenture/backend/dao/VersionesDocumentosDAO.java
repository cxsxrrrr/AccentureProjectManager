package com.Accenture.backend.dao;

import java.util.List;
import java.util.Optional;
import com.Accenture.backend.model.VersionesDocumentos;

public interface VersionesDocumentosDAO {
    VersionesDocumentos save(VersionesDocumentos version);
    Optional<VersionesDocumentos> findById(Long versionesDocumentosId);
    List<VersionesDocumentos> findAll();
    void deleteById(Long versionesDocumentosId);

    // Métodos adicionales
    List<VersionesDocumentos> findByDocumentosId(Long documentoId);
    List<VersionesDocumentos> findByTareasId(Long tareasId);
    List<VersionesDocumentos> findBySubidoPor(Long usuarioId);
    VersionesDocumentos findUltimaVersionByDocumentoId(Long documentoId);
    List<VersionesDocumentos> findByEstado(String estado);
}
