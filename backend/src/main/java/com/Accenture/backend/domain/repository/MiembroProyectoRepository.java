package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.MiembroProyecto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MiembroProyectoRepository extends JpaRepository<MiembroProyecto, Long> {
    List<MiembroProyecto> findByProyecto_ProyectoId(Long proyectoId);
    List<MiembroProyecto> findByUsuario_UsuarioId(Long usuarioId);

}
