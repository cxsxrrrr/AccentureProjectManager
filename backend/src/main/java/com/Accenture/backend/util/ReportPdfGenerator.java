package com.Accenture.backend.util;

import com.Accenture.backend.model.Reportes;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;

public class ReportPdfGenerator {
    public static byte[] generatePdf(Reportes rep) throws Exception {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();
            document.add(new Paragraph("Reporte ID: " + rep.getReporteId()));
            document.add(new Paragraph("Nombre: " + rep.getNombre()));
            document.add(new Paragraph("Tipo de Reporte: " + rep.getTipoReporte()));
            document.add(new Paragraph("Fecha Generado: " + rep.getFechaGenerado()));
            document.add(new Paragraph("Generado Por ID: " + rep.getGeneradoPor().getUsuarioId()));
            document.add(new Paragraph("Proyecto ID: " + rep.getProyecto().getProyectoId()));
            document.add(new Paragraph("Parametros: " + rep.getParametros()));
            document.close();
            return out.toByteArray();
        }
    }
}
