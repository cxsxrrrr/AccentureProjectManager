package com.Accenture.backend.dao;

import com.Accenture.backend.model.Skills;

import java.util.List;

/*
 *  SE ESPECIFICAN LAS FUNCIONES QUE SERÁN IMPLEMENTADAS
 *  POSTERIORMENTE EN SkillsDAOImpl
 * */

public interface SkillsDAO {
    Skills guardarSkill(Skills skill);
    Skills actualizarSkill(Skills skill);
    public void eliminarSkill(Skills skill);
    public List<Skills> obtenerSkills();
}
