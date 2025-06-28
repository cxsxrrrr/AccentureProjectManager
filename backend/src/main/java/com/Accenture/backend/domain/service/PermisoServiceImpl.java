package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.PermisoDTO;
import com.Accenture.backend.domain.repository.PermisoRepository;
import com.Accenture.backend.model.Permiso;
import com.Accenture.backend.util.PermisoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PermisoServiceImpl implements PermisoService {

    @Autowired
    private PermisoRepository permisoRepository;

    @Autowired
    private PermisoMapper permisoMapper;

    @Override
    public PermisoDTO guardar(PermisoDTO permisoDTO) {
        Permiso permiso = permisoMapper.toEntity(permisoDTO);
        Permiso guardado = permisoRepository.save(permiso);
        return permisoMapper.toDTO(guardado);
    }

    @Override
    public List<PermisoDTO> listarTodos() {
        return permisoRepository.findAll()
                .stream()
                .map(permisoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PermisoDTO> obtenerPorNombre(String nombre) {
        return permisoRepository.findByNombre(nombre)
                .map(permisoMapper::toDTO);
    }

    @Override
    public void eliminarPorId(Long id) {
        permisoRepository.deleteById(id);
    }
}
