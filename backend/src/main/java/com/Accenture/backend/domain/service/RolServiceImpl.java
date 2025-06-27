package com.Accenture.backend.domain.service;

import com.Accenture.backend.domain.dto.RolDTO;
import com.Accenture.backend.domain.repository.RolRepository;
import com.Accenture.backend.model.Rol;
import com.Accenture.backend.util.RolMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private RolMapper rolMapper;

    @Override
    public RolDTO guardarRol(RolDTO rolDTO) {
        Rol rol = rolMapper.toEntity(rolDTO);
        Rol guardado = rolRepository.save(rol);
        return rolMapper.toDTO(guardado);
    }

    @Override
    public List<RolDTO> listarRoles() {
        return rolRepository.findAll().stream()
                .map(rolMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RolDTO> buscarPorNombre(String nombre) {
        return rolRepository.findByNombre(nombre)
                .map(rolMapper::toDTO);
    }
}