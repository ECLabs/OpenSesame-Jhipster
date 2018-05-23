package com.ec.opensesame.service.mapper;

import com.ec.opensesame.domain.*;
import com.ec.opensesame.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    @Mapping(source = "document.id", target = "documentId")
    CommentDTO toDto(Comment comment);

    @Mapping(source = "documentId", target = "document")
    Comment toEntity(CommentDTO commentDTO);

    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
