package com.Accenture.backend.util;

import com.Accenture.backend.model.Reportes;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import com.itextpdf.text.Paragraph;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Map;
import java.awt.image.BufferedImage;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.chart.plot.PlotOrientation;
import com.itextpdf.text.Image;

public class ReportPdfGenerator {
    public static byte[] generatePdf(Reportes rep) throws Exception {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter.getInstance(document, out);
            document.open();
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, new BaseColor(0xC7, 0x0F, 0xFF));
            Paragraph title = new Paragraph(rep.getNombre(), titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{1, 2});
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE);
            String[] headers = {"Campo", "Valor"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
                cell.setBackgroundColor(new BaseColor(0xC7, 0x0F, 0xFF));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPadding(8);
                table.addCell(cell);
            }
            addTableRow(table, "Reporte ID", String.valueOf(rep.getReporteId()));
            addTableRow(table, "Tipo de Reporte", rep.getTipoReporte());
            addTableRow(table, "Fecha Generado", rep.getFechaGenerado().toString());
            addTableRow(table, "Generado Por (ID)", String.valueOf(rep.getGeneradoPor().getUsuarioId()));
            addTableRow(table, "Proyecto (ID)", String.valueOf(rep.getProyecto().getProyectoId()));
            // Add dynamic parameter rows
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> paramsMap = mapper.readValue(rep.getParametros(), new TypeReference<Map<String, Object>>(){});
            for (Map.Entry<String, Object> entry : paramsMap.entrySet()) {
                addTableRow(table, entry.getKey(), entry.getValue() != null ? entry.getValue().toString() : "");
            }
            document.add(table);
            // Agregar gráficos al final del reporte
            document.add(Chunk.NEWLINE);
            Object completed = paramsMap.get("completedTasks");
            Object pending = paramsMap.get("pendingTasks");
            if (completed instanceof Number && pending instanceof Number) {
                DefaultPieDataset pieDataset = new DefaultPieDataset();
                pieDataset.setValue("Completadas", ((Number) completed).doubleValue());
                pieDataset.setValue("Pendientes", ((Number) pending).doubleValue());
                JFreeChart pieChart = ChartFactory.createPieChart("Tareas Completadas vs Pendientes", pieDataset, true, true, false);
                BufferedImage pieImage = pieChart.createBufferedImage(500, 300);
                byte[] pieBytes = ChartUtils.encodeAsPNG(pieImage);
                Image pieImg = Image.getInstance(pieBytes);
                pieImg.setAlignment(Element.ALIGN_CENTER);
                document.add(pieImg);
            }
            Object milestoneComp = paramsMap.get("milestoneCompliance");
            if (milestoneComp instanceof Number) {
                DefaultCategoryDataset barDataset = new DefaultCategoryDataset();
                barDataset.addValue(((Number) milestoneComp).doubleValue(), "Cumplimiento", "Hitos");
                JFreeChart barChart = ChartFactory.createBarChart("Cumplimiento de Hitos", "", "%", barDataset, PlotOrientation.VERTICAL, false, true, false);
                BufferedImage barImage = barChart.createBufferedImage(500, 300);
                byte[] barBytes = ChartUtils.encodeAsPNG(barImage);
                Image barImg = Image.getInstance(barBytes);
                barImg.setAlignment(Element.ALIGN_CENTER);
                document.add(Chunk.NEWLINE);
                document.add(barImg);
            }
             document.close();
            return out.toByteArray();
        }
    }

    private static void addTableRow(PdfPTable table, String field, String value) {
        Font fieldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11);
        Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 11);
        PdfPCell fieldCell = new PdfPCell(new Phrase(field, fieldFont));
        fieldCell.setPadding(6);
        table.addCell(fieldCell);
        PdfPCell valueCell = new PdfPCell(new Phrase(value, valueFont));
        valueCell.setPadding(6);
        table.addCell(valueCell);
    }
}
