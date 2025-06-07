package com.Accenture.backend.dao;

import com.Accenture.backend.domain.repository.HitosProyectoRepository;
import com.Accenture.backend.model.HitosProyecto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HitosProyectoDAOImpl implements HitosProyectoDAO {

    private final HitosProyectoRepository hitosRepository;

    public HitosProyectoDAOImpl(HitosProyectoRepository hitosRepository) {
        this.hitosRepository = hitosRepository;
    }

    @Override
    public HitosProyecto guardarHito(HitosProyecto hito) {
        return hitosRepository.save(hito);
    }

    @Override
    public HitosProyecto actualizarHito(HitosProyecto hito) {
        return hitosRepository.save(hito);
    }

    @Override
    public void eliminarHito(HitosProyecto hito) {
        hitosRepository.delete(hito);
    }

    @Override
    public void eliminarHitoxId(Long hitoId) {
        hitosRepository.deleteById(hitoId);
    }

    @Override
    public List<HitosProyecto> obtenerHitosxProyecto(Long idProyecto) {
        return hitosRepository.findByProyectoProyectoId(idProyecto);
    }
}
