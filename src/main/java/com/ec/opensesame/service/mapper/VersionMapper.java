package com.ec.opensesame.service.mapper;

import com.ec.opensesame.domain.*;
import com.ec.opensesame.service.dto.VersionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Version and its DTO VersionDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface VersionMapper extends EntityMapper<VersionDTO, Version> {

    @Mapping(source = "document.id", target = "documentId")
    VersionDTO toDto(Version version);

    @Mapping(source = "documentId", target = "document")
    Version toEntity(VersionDTO versionDTO);

    default Version fromId(Long id) {
        if (id == null) {
            return null;
        }
        Version version = new Version();
        version.setId(id);
        return version;
    }
}
