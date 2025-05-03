package com.Accenture.backend.dto;

public class SaludoDTO {

    private String nombre;
    private String mensaje;

    public SaludoDTO(String nombre, String mensaje) {
        this.nombre = nombre;
        this.mensaje = mensaje;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
