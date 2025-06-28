package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.ReportesDAO;
import com.Accenture.backend.domain.dto.ReportesDTO;
import com.Accenture.backend.model.Reportes;
import com.Accenture.backend.util.ReportesMapper;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Usuario;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    private final ReportesDAO reportesDAO;
    private final ReportesMapper reportesMapper;
    private final UsuarioRepository usuarioRepository;
    private final ProyectoRepository proyectoRepository;

    private static final Logger logger = LoggerFactory.getLogger(ReporteService.class);

    public ReporteService(ReportesDAO reportesDAO,
                          ReportesMapper reportesMapper,
                          UsuarioRepository usuarioRepository,
                          ProyectoRepository proyectoRepository) {
        this.reportesDAO = reportesDAO;
        this.reportesMapper = reportesMapper;
        this.usuarioRepository = usuarioRepository;
        this.proyectoRepository = proyectoRepository;
    }

    // Crear o actualizar un reporte
    @Transactional
    public ReportesDTO guardarReporte(ReportesDTO dto) {
        Reportes entity = reportesMapper.toEntity(dto);

        // Obtener Usuario completo
        Usuario usuario = usuarioRepository.findById(dto.getGeneradoPorId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + dto.getGeneradoPorId()));
        entity.setGeneradoPor(usuario);

        // Obtener Proyecto completo
        Proyecto proyecto = proyectoRepository.findById(dto.getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con id: " + dto.getProyectoId()));
        entity.setProyecto(proyecto);

        // Asignar parámetros directamente
        entity.setParametros(dto.getParametros());

        // Asignar fecha de generación
        if (dto.getFechaGenerado() != null) {
            entity.setFechaGenerado(dto.getFechaGenerado());
        } else {
            entity.setFechaGenerado(LocalDateTime.now());
        }

        Reportes saved = reportesDAO.guardarReporte(entity);
        return reportesMapper.toDTO(saved);
    }

    // Listar todos los reportes
    public List<ReportesDTO> listarReportes() {
        return reportesDAO.obtenerReportes().stream()
                .map(reportesMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener reporte por ID
    public ReportesDTO obtenerReportePorId(Long id) {
        Reportes rep = reportesDAO.buscarReportePorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporte no encontrado con id: " + id));
        return reportesMapper.toDTO(rep);
    }

    // Eliminar reporte
    @Transactional
    public void eliminarReporte(Long id) {
        Reportes rep = reportesDAO.buscarReportePorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporte no encontrado con id: " + id));
        reportesDAO.eliminarReporte(rep);
    }

    // Generar reporte en Excel
    public byte[] generarReporteExcel(Long id) throws Exception {
        return reportesDAO.generarReporteExcel(id);
    }

    // Generar reporte en PDF
    public byte[] generarReportePdf(Long id) throws Exception {
        return reportesDAO.generarReportePdf(id);
    }
}
