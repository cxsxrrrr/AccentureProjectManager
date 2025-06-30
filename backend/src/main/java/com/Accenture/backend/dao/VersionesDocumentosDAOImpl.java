package com.Accenture.backend.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.Accenture.backend.model.VersionesDocumentos;
import com.Accenture.backend.domain.repository.VersionesDocumentosRepository;

@Repository
public class VersionesDocumentosDAOImpl implements VersionesDocumentosDAO {
    private final VersionesDocumentosRepository repository;

    @Autowired
    public VersionesDocumentosDAOImpl(VersionesDocumentosRepository repository) {
        this.repository = repository;
    }

    @Override
    public VersionesDocumentos save(VersionesDocumentos version) {
        return repository.save(version);
    }

    @Override
    public Optional<VersionesDocumentos> findById(Long versionesDocumentosId) {
        return repository.findById(versionesDocumentosId);
    }

    @Override
    public List<VersionesDocumentos> findAll() {
        return repository.findAll();
    }

    @Override
    public void deleteById(Long versionesDocumentosId) {
        repository.deleteById(versionesDocumentosId);
    }

    @Override
    public List<VersionesDocumentos> findByDocumentosId(Long documentoId) {
        return repository.findByDocumentosId_DocumentoId(documentoId);
    }

    @Override
    public List<VersionesDocumentos> findByTareasId(Long tareasId) {
        return repository.findByTareasId_TareasId(tareasId);
    }

    @Override
    public List<VersionesDocumentos> findBySubidoPor(Long usuarioId) {
        return repository.findBySubidoPor_UsuarioId(usuarioId);
    }

    @Override
    public VersionesDocumentos findUltimaVersionByDocumentoId(Long documentoId) {
        return repository.findFirstByDocumentosId_DocumentoIdAndEsUltimaVersionTrue(documentoId);
    }

    @Override
    public List<VersionesDocumentos> findByEstado(String estado) {
        return repository.findByEstado(estado);
    }
}
