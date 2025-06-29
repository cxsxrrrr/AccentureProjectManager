package com.Accenture.backend.util;

import com.Accenture.backend.model.Reportes;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Usuario;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFColor;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

public class ReportExcelGenerator {

    public static byte[] generateExcel(Reportes rep) throws Exception {
        try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte");

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> paramsMap = mapper.readValue(rep.getParametros(), new TypeReference<Map<String, Object>>() {});

            // Columnas fijas
            List<String> headers = new ArrayList<>(Arrays.asList(
                    "reporteId", "nombre", "tipoReporte", "fechaGenerado", "generadoPorId",
                    "proyectoId", "nombreProyecto", "estado", "fechaInicio", "fechaFin",
                    "gerenteProyectoId", "clienteId"
            ));

            // Agregar parámetros dinámicos del JSON
            headers.addAll(paramsMap.keySet());

            // Estilo de encabezado
            XSSFCellStyle headerStyle = workbook.createCellStyle();
            XSSFFont headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            XSSFColor purple = new XSSFColor(new Color(0xC7, 0x0F, 0xFF), null);
            headerStyle.setFillForegroundColor(purple);
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Fila de encabezado
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.size(); i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers.get(i));
                cell.setCellStyle(headerStyle);
            }

            // Fila de datos
            Row row = sheet.createRow(1);
            int idx = 0;

            Proyecto proyecto = rep.getProyecto();
            Usuario gerente = proyecto.getGerenteProyecto();
            Usuario cliente = proyecto.getCliente();

            row.createCell(idx++).setCellValue(rep.getReporteId());
            row.createCell(idx++).setCellValue(rep.getNombre());
            row.createCell(idx++).setCellValue(rep.getTipoReporte());
            row.createCell(idx++).setCellValue(rep.getFechaGenerado().toString());
            row.createCell(idx++).setCellValue(rep.getGeneradoPor().getNombre() + " " + rep.getGeneradoPor().getApellido());

            row.createCell(idx++).setCellValue(proyecto.getProyectoId());
            row.createCell(idx++).setCellValue(proyecto.getNombreProyecto());
            row.createCell(idx++).setCellValue(proyecto.getEstado());
            row.createCell(idx++).setCellValue(proyecto.getFechaInicio().toString());
            row.createCell(idx++).setCellValue(proyecto.getFechaFin().toString());
            row.createCell(idx++).setCellValue(gerente != null ? gerente.getNombre() + " " + gerente.getApellido() : "N/A");
            row.createCell(idx++).setCellValue(cliente != null ? cliente.getNombre() + " " + cliente.getApellido() : "N/A");

            for (String key : paramsMap.keySet()) {
                Object val = paramsMap.get(key);
                row.createCell(idx++).setCellValue(val != null ? val.toString() : "");
            }

            // Auto-size
            for (int i = 0; i < headers.size(); i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }
}
