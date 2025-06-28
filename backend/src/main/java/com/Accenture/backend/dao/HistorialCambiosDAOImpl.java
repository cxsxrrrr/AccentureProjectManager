package com.Accenture.backend.dao;

import com.Accenture.backend.model.HistorialCambios;
import com.Accenture.backend.domain.repository.HistorialCambiosRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HistorialCambiosDAOImpl implements HistorialCambiosDAO {

    private final HistorialCambiosRepository historialRepository;

    // Constructor
    public HistorialCambiosDAOImpl(HistorialCambiosRepository historialRepository) {
        this.historialRepository = historialRepository;
    }

    @Transactional
    @Override
    public HistorialCambios guardarCambio(HistorialCambios historial) {
        return historialRepository.save(historial);
    }

    @Override
    public List<HistorialCambios> mostrarCambiosxUsuarioId(Long usuarioId) {
        return historialRepository.findByUsuarioUsuarioId(usuarioId);
    }

    @Override
    public List<HistorialCambios> mostrarCambios() {
        return historialRepository.findAll();
    }
}
