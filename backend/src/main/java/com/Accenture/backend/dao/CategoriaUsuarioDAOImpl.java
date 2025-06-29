package com.Accenture.backend.dao;

import com.Accenture.backend.domain.repository.CategoriaUsuarioRepository;
import com.Accenture.backend.model.CategoriaUsuario;
import com.Accenture.backend.model.Usuario;
import com.Accenture.backend.model.Categoria;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;


@Repository
public class CategoriaUsuarioDAOImpl implements CategoriaUsuarioDAO {

    private final CategoriaUsuarioRepository categoriaUsuarioRepository;

    public CategoriaUsuarioDAOImpl(CategoriaUsuarioRepository categoriaUsuarioRepository) {
        this.categoriaUsuarioRepository = categoriaUsuarioRepository;
    }

    @Transactional
    @Override
    public void asociarCategoriaAUsuario(Long usuarioId, Long categoriaId) {
        // Verificar si ya existe la asociación
        if (categoriaUsuarioRepository.findByUsuario_UsuarioIdAndCategoria_CategoriaId(usuarioId, categoriaId).isPresent()) {
            throw new IllegalArgumentException("El usuario ya tiene esta categoría asociada.");
        }
        CategoriaUsuario cu = new CategoriaUsuario();
        // Construyo solo proxies con el ID para no recargar entidad completa
        Usuario u = new Usuario(); u.setUsuarioId(usuarioId);
        Categoria c = new Categoria(); c.setCategoriaId(categoriaId);
        cu.setUsuario(u);
        cu.setCategoria(c);
        // Si tienes campo experiencia lo puedes setear aquí
        categoriaUsuarioRepository.save(cu);
    }

    @Transactional
    @Override
    public void removerCategoriaAUsuario(Long usuarioId, Long categoriaId) {
        CategoriaUsuario cu = categoriaUsuarioRepository
            .findByUsuario_UsuarioIdAndCategoria_CategoriaId(usuarioId, categoriaId)
            .orElseThrow(() -> new IllegalArgumentException("No existe esa asociación"));
        categoriaUsuarioRepository.delete(cu);
    }
}