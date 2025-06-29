package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Repositorio de funciones Standard para manipular la Base de Datos
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCedula(Long cedula);

    // Métodos de búsqueda personalizados
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByNumeroTelefono(String telefono);
    List<Usuario> findByEstado(String estado);
}