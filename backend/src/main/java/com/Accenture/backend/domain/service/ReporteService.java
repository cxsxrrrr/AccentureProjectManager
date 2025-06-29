package com.Accenture.backend.domain.service;

import com.Accenture.backend.dao.ReportesDAO;
import com.Accenture.backend.domain.dto.ReportesDTO;
import com.Accenture.backend.domain.repository.ProyectoRepository;
import com.Accenture.backend.domain.repository.UsuarioRepository;
import com.Accenture.backend.exception.ResourceNotFoundException;
import com.Accenture.backend.model.Proyecto;
import com.Accenture.backend.model.Reportes;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.util.ReportExcelGenerator;
import com.Accenture.backend.util.ReportPdfGenerator;
import com.Accenture.backend.util.ReportesMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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

    @Transactional
    public ReportesDTO guardarReporte(ReportesDTO dto) {
        Reportes entity = reportesMapper.toEntity(dto);

        Usuario usuario = usuarioRepository.findById(dto.getGeneradoPorId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + dto.getGeneradoPorId()));
        entity.setGeneradoPor(usuario);

        Proyecto proyecto = proyectoRepository.findById(dto.getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con id: " + dto.getProyectoId()));
        entity.setProyecto(proyecto);

        entity.setParametros(dto.getParametros());
        entity.setFechaGenerado(dto.getFechaGenerado() != null ? dto.getFechaGenerado() : LocalDateTime.now());

        Reportes saved = reportesDAO.guardarReporte(entity);
        return reportesMapper.toDTO(saved);
    }

    public List<ReportesDTO> listarReportes() {
        return reportesDAO.obtenerReportes().stream()
                .map(reportesMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ReportesDTO obtenerReportePorId(Long id) {
        Reportes rep = reportesDAO.buscarReportePorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporte no encontrado con id: " + id));
        return reportesMapper.toDTO(rep);
    }

    @Transactional
    public void eliminarReporte(Long id) {
        Reportes rep = reportesDAO.buscarReportePorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporte no encontrado con id: " + id));
        reportesDAO.eliminarReporte(rep);
    }

    public byte[] generarReporteExcel(Long id) throws Exception {
        Reportes rep = reportesDAO.buscarReportePorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporte no encontrado con id: " + id));

        Proyecto proyecto = proyectoRepository.findById(rep.getProyecto().getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con id: " + rep.getProyecto().getProyectoId()));

        // Cargar relaciones: cliente y gerente
        if (proyecto.getCliente() == null || proyecto.getCliente().getNombre() == null) {
            proyecto.setCliente(usuarioRepository.findById(proyecto.getCliente().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado")));
        }
        if (proyecto.getGerenteProyecto() == null || proyecto.getGerenteProyecto().getNombre() == null) {
            proyecto.setGerenteProyecto(usuarioRepository.findById(proyecto.getGerenteProyecto().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Gerente no encontrado")));
        }

        rep.setProyecto(proyecto);
        return ReportExcelGenerator.generateExcel(rep);
    }

    public byte[] generarReportePdf(Long id) throws Exception {
        Reportes rep = reportesDAO.buscarReportePorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporte no encontrado con id: " + id));

        Proyecto proyecto = proyectoRepository.findById(rep.getProyecto().getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con id: " + rep.getProyecto().getProyectoId()));

        // Cargar relaciones: cliente y gerente
        if (proyecto.getCliente() == null || proyecto.getCliente().getNombre() == null) {
            proyecto.setCliente(usuarioRepository.findById(proyecto.getCliente().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado")));
        }
        if (proyecto.getGerenteProyecto() == null || proyecto.getGerenteProyecto().getNombre() == null) {
            proyecto.setGerenteProyecto(usuarioRepository.findById(proyecto.getGerenteProyecto().getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Gerente no encontrado")));
        }

        rep.setProyecto(proyecto);
        return ReportPdfGenerator.generatePdf(rep);
    }
}
