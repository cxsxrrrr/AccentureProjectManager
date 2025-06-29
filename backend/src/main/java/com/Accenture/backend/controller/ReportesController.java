package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.ReportesDTO;
import com.Accenture.backend.domain.service.ReporteService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReportesController {

    private final ReporteService reporteService;

    public ReportesController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    // Crear o actualizar reporte
    @PostMapping
    public ResponseEntity<ReportesDTO> saveReporte(@RequestBody ReportesDTO dto) {
        ReportesDTO saved = reporteService.guardarReporte(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Listar todos los reportes
    @GetMapping
    public ResponseEntity<List<ReportesDTO>> getAllReportes() {
        List<ReportesDTO> list = reporteService.listarReportes();
        return ResponseEntity.ok(list);
    }

    // Obtener reporte por ID
    @GetMapping("/{id}")
    public ResponseEntity<ReportesDTO> getReporteById(@PathVariable Long id) {
        ReportesDTO dto = reporteService.obtenerReportePorId(id);
        return ResponseEntity.ok(dto);
    }

    // Eliminar reporte
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReporte(@PathVariable Long id) {
        reporteService.eliminarReporte(id);
        return ResponseEntity.noContent().build();
    }

    // Descargar reporte en Excel
    @GetMapping("/{id}/excel")
    public ResponseEntity<byte[]> downloadExcel(@PathVariable Long id) throws Exception {
        byte[] data = reporteService.generarReporteExcel(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report_" + id + ".xlsx");
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }

    // Descargar reporte en PDF
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) throws Exception {
        byte[] data = reporteService.generarReportePdf(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report_" + id + ".pdf");
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }
}
