package com.Accenture.backend.util;

import com.Accenture.backend.model.Reportes;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import java.io.ByteArrayOutputStream;

public class ReportExcelGenerator {
    public static byte[] generateExcel(Reportes rep) throws Exception {
        try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte");
            // Header
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("reporteId");
            header.createCell(1).setCellValue("nombre");
            header.createCell(2).setCellValue("tipoReporte");
            header.createCell(3).setCellValue("fechaGenerado");
            header.createCell(4).setCellValue("generadoPorId");
            header.createCell(5).setCellValue("proyectoId");
            header.createCell(6).setCellValue("parametros");
            // Data row
            Row row = sheet.createRow(1);
            row.createCell(0).setCellValue(rep.getReporteId());
            row.createCell(1).setCellValue(rep.getNombre());
            row.createCell(2).setCellValue(rep.getTipoReporte());
            row.createCell(3).setCellValue(rep.getFechaGenerado().toString());
            row.createCell(4).setCellValue(rep.getGeneradoPor().getUsuarioId());
            row.createCell(5).setCellValue(rep.getProyecto().getProyectoId());
            row.createCell(6).setCellValue(rep.getParametros());
            workbook.write(out);
            return out.toByteArray();
        }
    }
}
