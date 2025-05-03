package com.Accenture.backend.dao;

import com.Accenture.backend.model.Saludo;
import java.util.List;

public interface SaludoDAO {
    Saludo guardarSaludo(Saludo saludo);
    List<Saludo> obtenerTodosLosSaludos();
}
