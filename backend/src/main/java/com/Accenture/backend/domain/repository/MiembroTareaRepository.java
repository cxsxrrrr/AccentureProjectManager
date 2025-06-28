package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.MiembroTarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MiembroTareaRepository extends JpaRepository<MiembroTarea, Long> {
    List<MiembroTarea> findByProyecto_ProyectoId(Long proyectoId);
    List<MiembroTarea> findByUsuario_UsuarioId(Long usuarioId);

}
