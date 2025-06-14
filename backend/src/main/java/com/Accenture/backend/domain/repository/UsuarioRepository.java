package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
