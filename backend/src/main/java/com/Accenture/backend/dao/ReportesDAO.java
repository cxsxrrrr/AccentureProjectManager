package com.Accenture.backend.dao;

import com.Accenture.backend.model.Reportes;
import java.util.List;
import java.util.Optional;

public interface ReportesDAO {
    // Guardar un reporte
    Reportes guardarReporte(Reportes reporte);

    // Obtener todos los reportes registrados
    List<Reportes> obtenerReportes();

    // Buscar un reporte por ID
    Optional<Reportes> buscarReportePorId(Long reporteId);

    // Eliminar un reporte
    void eliminarReporte(Reportes reporte);

    // Generar y retornar el contenido del reporte en formato Excel
    byte[] generarReporteExcel(Long reporteId) throws Exception;

    // Generar y retornar el contenido del reporte en formato PDF
    byte[] generarReportePdf(Long reporteId) throws Exception;
}
