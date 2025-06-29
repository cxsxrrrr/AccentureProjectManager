package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.CategoriaUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
// Repositorio de funciones Standard para manipular la Base de Datos
public interface CategoriaUsuarioRepository extends JpaRepository<CategoriaUsuario, Long> {
    Optional<CategoriaUsuario> findByUsuario_UsuarioIdAndCategoria_CategoriaId(
        Long usuarioId,
        Long categoriaId
    );
    List<CategoriaUsuario> findAllByCategoria_CategoriaId(Long categoriaId);
    List<CategoriaUsuario> findAllByUsuario_UsuarioId(Long usuarioId);
}
