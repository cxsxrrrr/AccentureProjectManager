package com.Accenture.backend.util;


import com.Accenture.backend.domain.dto.SkillsDTO;
import com.Accenture.backend.model.Skills;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

/*
 * MAPPER DE ENTIDAD A DTO
 */

@Mapper(
        componentModel               = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy         = ReportingPolicy.IGNORE
)
public interface SkillsMapper {
    SkillsDTO toDTO(Skills skill);

    @org.mapstruct.Mapping(target = "skillId", ignore = true)
    Skills toEntity(SkillsDTO skillDTO);

    void updateSkillsFromDto(SkillsDTO dto, @MappingTarget Skills entity);
}
