package com.Accenture.backend.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.Accenture.backend.dao.DependenciaTareasDAO;
import com.Accenture.backend.model.DependenciaTareas;
import com.Accenture.backend.domain.dto.DependenciaTareasDTO;
import com.Accenture.backend.util.DependenciaTareasMapper;

@Service
public class DependenciaTareasService {
    private final DependenciaTareasDAO dependenciaTareasDAO;
    private final DependenciaTareasMapper mapper;

    @Autowired
    public DependenciaTareasService(DependenciaTareasDAO dependenciaTareasDAO, DependenciaTareasMapper mapper) {
        this.dependenciaTareasDAO = dependenciaTareasDAO;
        this.mapper = mapper;
    }

    public DependenciaTareasDTO save(DependenciaTareasDTO dto) {
        DependenciaTareas entity = mapper.toEntity(dto);
        return mapper.toDTO(dependenciaTareasDAO.save(entity));
    }

    public List<DependenciaTareasDTO> findAll() {
        return dependenciaTareasDAO.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public Optional<DependenciaTareasDTO> findById(Long id) {
        return dependenciaTareasDAO.findById(id).map(mapper::toDTO);
    }

    public void deleteById(Long id) {
        dependenciaTareasDAO.deleteById(id);
    }

    public DependenciaTareasDTO update(DependenciaTareasDTO dto) {
        DependenciaTareas entity = mapper.toEntity(dto);
        return mapper.toDTO(dependenciaTareasDAO.update(entity));
    }

    public List<DependenciaTareasDTO> findByTareaId(Long tareaId) {
        return dependenciaTareasDAO.findByTareaId(tareaId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<DependenciaTareasDTO> findByTareaPresendente(Long tareaPresendenteId) {
        return dependenciaTareasDAO.findByTareaPresendente(tareaPresendenteId).stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public List<DependenciaTareasDTO> findByTipoDependencia(String tipoDependencia) {
        return dependenciaTareasDAO.findByTipoDependencia(tipoDependencia).stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}
