package com.Accenture.backend.dao;

import com.Accenture.backend.model.Saludo;
import com.Accenture.backend.repository.SaludoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class SaludoDAOImpl implements SaludoDAO {

    private final SaludoRepository saludoRepository;

    public SaludoDAOImpl(SaludoRepository saludoRepository) {
        this.saludoRepository = saludoRepository;
    }

    @Transactional
    @Override
    public Saludo guardarSaludo(Saludo saludo) {
        return saludoRepository.save(saludo);
    }

    @Override
    public List<Saludo> obtenerTodosLosSaludos() {
        return saludoRepository.findAll();
    }
}
