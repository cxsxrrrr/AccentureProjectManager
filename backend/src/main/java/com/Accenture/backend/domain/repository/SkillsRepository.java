package com.Accenture.backend.domain.repository;

import com.Accenture.backend.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillsRepository extends JpaRepository<Skills, Long> {
}
