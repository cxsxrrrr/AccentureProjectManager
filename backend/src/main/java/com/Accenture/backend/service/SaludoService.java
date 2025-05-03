package com.Accenture.backend.service;

import com.Accenture.backend.dao.SaludoDAO;
import com.Accenture.backend.dto.SaludoDTO;
import com.Accenture.backend.model.Saludo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaludoService {

    private final SaludoDAO saludoDAO;

    public SaludoService(SaludoDAO saludoDAO) {
        this.saludoDAO = saludoDAO;
    }


    public SaludoDTO crearYGuardarSaludo(String nombre) {
        String mensaje = "Hola " + nombre;
        Saludo saludo = new Saludo(nombre, mensaje);
        saludoDAO.guardarSaludo(saludo);
        return new SaludoDTO(nombre, mensaje);
    }


    public List<SaludoDTO> obtenerSaludos() {
        List<Saludo> saludos = saludoDAO.obtenerTodosLosSaludos();
        return saludos.stream()
                .map(s -> new SaludoDTO(s.getNombre(), s.getMensaje()))
                .collect(Collectors.toList());
    }
}
