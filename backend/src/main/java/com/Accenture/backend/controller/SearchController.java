package com.Accenture.backend.controller;

import com.Accenture.backend.domain.dto.ProyectoDTO;
import com.Accenture.backend.domain.dto.UsuarioDTO;
import com.Accenture.backend.domain.service.ProyectoService;
import com.Accenture.backend.domain.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controlador para búsquedas generales de Usuarios y Proyectos.
 */
@RestController
@RequestMapping("api/search")
public class SearchController {
    private final UsuarioService usuarioService;
    private final ProyectoService proyectoService;

    public SearchController(UsuarioService usuarioService, ProyectoService proyectoService) {
        this.usuarioService = usuarioService;
        this.proyectoService = proyectoService;
    }

    /**
     * Búsqueda genérica que retorna usuarios y proyectos cuyo nombre coincida con la consulta.
     * @param q palabra clave para búsqueda.
     * @return mapa con listas de usuarios y proyectos.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> search(
            @RequestParam(value = "q", required = false, defaultValue = "") String q,
            @RequestParam(value = "estadoUsuario", required = false) String estadoUsuario,
            @RequestParam(value = "estadoProyecto", required = false) String estadoProyecto,
            @RequestParam(value = "fechaInicioDesde", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicioDesde,
            @RequestParam(value = "fechaInicioHasta", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicioHasta
    ) {
        boolean anyFilter = !q.isBlank() || (estadoUsuario != null && !estadoUsuario.isBlank())
                || (estadoProyecto != null && !estadoProyecto.isBlank())
                || (fechaInicioDesde != null && fechaInicioHasta != null);

        // Usuarios: aplicar filtro solo si afecta usuarios
        List<UsuarioDTO> usuarios;
        if (!anyFilter) {
            usuarios = usuarioService.obtenerUsuarios();
        } else if (!q.isBlank()) {
            usuarios = usuarioService.buscarUsuariosPorNombre(q);
        } else if (estadoUsuario != null && !estadoUsuario.isBlank()) {
            usuarios = usuarioService.buscarUsuariosPorEstado(estadoUsuario);
        } else {
            usuarios = List.of();
        }

        // Proyectos: aplicar filtro solo si afecta proyectos
        List<ProyectoDTO> proyectos;
        if (!anyFilter) {
            proyectos = proyectoService.obtenerTodosLosProyectos();
        } else if (!q.isBlank()) {
            proyectos = proyectoService.buscarProyectosPorNombre(q);
        } else if (estadoProyecto != null && !estadoProyecto.isBlank()) {
            proyectos = proyectoService.buscarProyectosPorEstado(estadoProyecto);
        } else if (fechaInicioDesde != null && fechaInicioHasta != null) {
            proyectos = proyectoService.buscarProyectosPorFechaInicioEntre(fechaInicioDesde, fechaInicioHasta);
        } else {
            proyectos = List.of();
        }


        Map<String, Object> result = new HashMap<>();
        result.put("usuarios", usuarios);
        result.put("proyectos", proyectos);
        return ResponseEntity.ok(result);
    }
}
