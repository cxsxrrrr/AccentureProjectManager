package com.Accenture.backend.repository;

import com.Accenture.backend.model.Saludo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaludoRepository extends JpaRepository<Saludo, Long> {

}
