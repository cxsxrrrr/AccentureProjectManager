package com.Accenture.backend.domain.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.Accenture.backend.dao.VersionesDocumentosDAO;
import com.Accenture.backend.model.VersionesDocumentos;
import com.Accenture.backend.domain.dto.VersionesDocumentosDTO;
import com.Accenture.backend.util.VersionesDocumentosMapper;

@Service
public class VersionesDocumentosService {
    private final VersionesDocumentosDAO versionesDocumentosDAO;
    private final VersionesDocumentosMapper mapper;

    @Autowired
    public VersionesDocumentosService(VersionesDocumentosDAO versionesDocumentosDAO, VersionesDocumentosMapper mapper) {
        this.versionesDocumentosDAO = versionesDocumentosDAO;
        this.mapper = mapper;
    }

    public VersionesDocumentosDTO save(VersionesDocumentosDTO dto) {
        VersionesDocumentos entity = mapper.toEntity(dto);
        return mapper.toDTO(versionesDocumentosDAO.save(entity));
    }

    public Optional<VersionesDocumentosDTO> findById(Long id) {
        return versionesDocumentosDAO.findById(id).map(mapper::toDTO);
    }

    public List<VersionesDocumentosDTO> findAll() {
        return versionesDocumentosDAO.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        versionesDocumentosDAO.deleteById(id);
    }

    public List<VersionesDocumentosDTO> findByDocumentosId(Long documentoId) {
        return versionesDocumentosDAO.findByDocumentosId(documentoId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<VersionesDocumentosDTO> findByTareasId(Long tareasId) {
        return versionesDocumentosDAO.findByTareasId(tareasId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<VersionesDocumentosDTO> findBySubidoPor(Long usuarioId) {
        return versionesDocumentosDAO.findBySubidoPor(usuarioId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public VersionesDocumentosDTO findUltimaVersionByDocumentoId(Long documentoId) {
        VersionesDocumentos entity = versionesDocumentosDAO.findUltimaVersionByDocumentoId(documentoId);
        return entity != null ? mapper.toDTO(entity) : null;
    }

    public List<VersionesDocumentosDTO> findByEstado(String estado) {
        return versionesDocumentosDAO.findByEstado(estado).stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}
