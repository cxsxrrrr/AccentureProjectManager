package com.Accenture.backend.dao;

import com.Accenture.backend.model.Reportes;
import com.Accenture.backend.domain.repository.ReportesRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public class ReportesDAOImpl implements ReportesDAO {

    private final ReportesRepository reportesRepository;

    public ReportesDAOImpl(ReportesRepository reportesRepository) {
        this.reportesRepository = reportesRepository;
    }

    @Override
    public Reportes guardarReporte(Reportes reporte) {
        return reportesRepository.save(reporte);
    }

    @Override
    public List<Reportes> obtenerReportes() {
        return reportesRepository.findAll();
    }

    @Override
    public Optional<Reportes> buscarReportePorId(Long reporteId) {
        return reportesRepository.findById(reporteId);
    }

    @Override
    public void eliminarReporte(Reportes reporte) {
        reportesRepository.delete(reporte);
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generarReporteExcel(Long reporteId) throws Exception {
        Reportes rep = reportesRepository.findById(reporteId)
                .orElseThrow(() -> new IllegalArgumentException("Reporte no encontrado con id: " + reporteId));
        // TODO: Implementar generación de Excel usando Apache POI u otra librería
        return new byte[0];
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generarReportePdf(Long reporteId) throws Exception {
        Reportes rep = reportesRepository.findById(reporteId)
                .orElseThrow(() -> new IllegalArgumentException("Reporte no encontrado con id: " + reporteId));
        // TODO: Implementar generación de PDF usando iText o PDFBox
        return new byte[0];
    }
}
