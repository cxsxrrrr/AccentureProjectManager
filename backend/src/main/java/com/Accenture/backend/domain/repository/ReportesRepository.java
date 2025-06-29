package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Reportes;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportesRepository extends JpaRepository<Reportes, Long> {

    // Filtrar reportes por rango de fecha generado
    List<Reportes> findAllByFechaGeneradoBetween(LocalDateTime desde, LocalDateTime hasta);

    // Filtrar reportes por usuario que generó
    List<Reportes> findAllByGeneradoPor_UsuarioId(Long usuarioId);

    // Filtrar reportes por proyecto asociado
    List<Reportes> findAllByProyecto_ProyectoId(Long proyectoId);

    // Filtrar reportes por tipo de reporte
    List<Reportes> findAllByTipoReporte(String tipoReporte);

}
