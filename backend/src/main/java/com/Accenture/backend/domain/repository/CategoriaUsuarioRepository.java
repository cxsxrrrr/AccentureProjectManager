package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.CategoriaUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
// Repositorio de funciones Standard para manipular la Base de Datos
public interface CategoriaUsuarioRepository extends JpaRepository<CategoriaUsuario, Long> {
    Optional<CategoriaUsuario> findByUsuario_UsuarioIdAndCategoria_CategoriaId(
        Long usuarioId,
        Long categoriaId
    );
}
