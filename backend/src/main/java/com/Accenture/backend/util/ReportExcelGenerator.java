package com.Accenture.backend.util;

import com.Accenture.backend.model.Reportes;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.ss.usermodel.IndexedColors;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class ReportExcelGenerator {
    public static byte[] generateExcel(Reportes rep) throws Exception {
        try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte");
            // Parse JSON parameters into map
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> paramsMap = mapper.readValue(rep.getParametros(), new TypeReference<Map<String, Object>>(){});
            // Build headers list: fixed + dynamic
            List<String> headers = new ArrayList<>(Arrays.asList("reporteId","nombre","tipoReporte","fechaGenerado","generadoPorId","proyectoId"));
            headers.addAll(paramsMap.keySet());
             // Style for header
             XSSFCellStyle headerStyle = workbook.createCellStyle();
             XSSFFont headerFont = workbook.createFont();
             headerFont.setBold(true);
             headerFont.setColor(IndexedColors.WHITE.getIndex());
             headerStyle.setFont(headerFont);
             XSSFColor purple = new XSSFColor(new Color(0xC7,0x0F,0xFF), null);
             headerStyle.setFillForegroundColor(purple);
             headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            // Header row with dynamic parameters
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.size(); i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers.get(i));
                cell.setCellStyle(headerStyle);
            }
            // Data row: fixed values
            Row row = sheet.createRow(1);
            int idx = 0;
            row.createCell(idx++).setCellValue(rep.getReporteId());
            row.createCell(idx++).setCellValue(rep.getNombre());
            row.createCell(idx++).setCellValue(rep.getTipoReporte());
            row.createCell(idx++).setCellValue(rep.getFechaGenerado().toString());
            row.createCell(idx++).setCellValue(rep.getGeneradoPor().getUsuarioId());
            row.createCell(idx++).setCellValue(rep.getProyecto().getProyectoId());
            // Dynamic parameter values
            for (String key : paramsMap.keySet()) {
                Object val = paramsMap.get(key);
                row.createCell(idx++).setCellValue(val != null ? val.toString() : "");
            }
            // Auto-size all columns
            for (int i = 0; i < headers.size(); i++) {
                sheet.autoSizeColumn(i);
            }
             workbook.write(out);
             return out.toByteArray();
         }
     }
 }
