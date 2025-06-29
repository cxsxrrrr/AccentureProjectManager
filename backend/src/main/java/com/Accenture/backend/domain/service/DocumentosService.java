package com.Accenture.backend.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.Accenture.backend.dao.DocumentosDAO;
import com.Accenture.backend.model.Documentos;
import com.Accenture.backend.domain.dto.DocumentosDTO;
import com.Accenture.backend.util.DocumentosMapper;

@Service
public class DocumentosService {
    private final DocumentosDAO documentosDAO;
    private final DocumentosMapper documentosMapper;

    @Autowired
    public DocumentosService(DocumentosDAO documentosDAO, DocumentosMapper documentosMapper) {
        this.documentosDAO = documentosDAO;
        this.documentosMapper = documentosMapper;
    }

    public DocumentosDTO save(DocumentosDTO dto) {
        Documentos documento = documentosMapper.toEntity(dto);
        return documentosMapper.toDTO(documentosDAO.save(documento));
    }

    public Optional<DocumentosDTO> findById(Long documentoId) {
        return documentosDAO.findById(documentoId).map(documentosMapper::toDTO);
    }

    public List<DocumentosDTO> findAll() {
        return documentosDAO.findAll().stream().map(documentosMapper::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long documentoId) {
        documentosDAO.deleteById(documentoId);
    }

    public List<DocumentosDTO> findByProyectoId(Long proyectoId) {
        return documentosDAO.findByProyectoId(proyectoId).stream().map(documentosMapper::toDTO).collect(Collectors.toList());
    }

    public List<DocumentosDTO> findByNombreOriginal(String nombreOriginal) {
        return documentosDAO.findByNombreOriginal(nombreOriginal).stream().map(documentosMapper::toDTO).collect(Collectors.toList());
    }

    public List<DocumentosDTO> findByNombreOriginalContainingIgnoreCase(String nombre) {
        return documentosDAO.findByNombreOriginalContainingIgnoreCase(nombre).stream().map(documentosMapper::toDTO).collect(Collectors.toList());
    }
}
