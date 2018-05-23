package com.ec.opensesame.service.mapper;

import com.ec.opensesame.domain.*;
import com.ec.opensesame.service.dto.DocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Document and its DTO DocumentDTO.
 */
@Mapper(componentModel = "spring", uses = {VersionMapper.class})
public interface DocumentMapper extends EntityMapper<DocumentDTO, Document> {

    @Mapping(source = "currversion.id", target = "currversionId")
    DocumentDTO toDto(Document document);

    @Mapping(source = "currversionId", target = "currversion")
    @Mapping(target = "histories", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "versions", ignore = true)
    Document toEntity(DocumentDTO documentDTO);

    default Document fromId(Long id) {
        if (id == null) {
            return null;
        }
        Document document = new Document();
        document.setId(id);
        return document;
    }
}
