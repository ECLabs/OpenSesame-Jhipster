package com.ec.opensesame.service.mapper;

import com.ec.opensesame.domain.*;
import com.ec.opensesame.service.dto.HistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity History and its DTO HistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface HistoryMapper extends EntityMapper<HistoryDTO, History> {

    @Mapping(source = "document.id", target = "documentId")
    HistoryDTO toDto(History history);

    @Mapping(source = "documentId", target = "document")
    History toEntity(HistoryDTO historyDTO);

    default History fromId(Long id) {
        if (id == null) {
            return null;
        }
        History history = new History();
        history.setId(id);
        return history;
    }
}
