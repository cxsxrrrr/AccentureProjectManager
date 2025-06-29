package com.Accenture.backend.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.Accenture.backend.model.VersionesDocumentos;

@Repository
public interface VersionesDocumentosRepository extends JpaRepository<VersionesDocumentos, Long> {
    // Buscar versiones por documento
    List<VersionesDocumentos> findByDocumentosId_DocumentoId(Long documentoId);

    // Buscar versiones por tarea
    List<VersionesDocumentos> findByTareasId_TareasId(Long tareasId);

    // Buscar versiones por usuario que subió
    List<VersionesDocumentos> findBySubidoPor_UsuarioId(Long usuarioId);

    // Buscar solo la última versión de un documento
    VersionesDocumentos findFirstByDocumentosId_DocumentoIdAndEsUltimaVersionTrue(Long documentoId);

    // Buscar todas las versiones activas (por estado)
    List<VersionesDocumentos> findByEstado(String estado);
}
