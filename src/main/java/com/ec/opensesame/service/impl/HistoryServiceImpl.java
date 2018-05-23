package com.ec.opensesame.service.impl;

import com.ec.opensesame.service.HistoryService;
import com.ec.opensesame.domain.History;
import com.ec.opensesame.repository.HistoryRepository;
import com.ec.opensesame.service.dto.HistoryDTO;
import com.ec.opensesame.service.mapper.HistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing History.
 */
@Service
@Transactional
public class HistoryServiceImpl implements HistoryService {

    private final Logger log = LoggerFactory.getLogger(HistoryServiceImpl.class);

    private final HistoryRepository historyRepository;

    private final HistoryMapper historyMapper;

    public HistoryServiceImpl(HistoryRepository historyRepository, HistoryMapper historyMapper) {
        this.historyRepository = historyRepository;
        this.historyMapper = historyMapper;
    }

    /**
     * Save a history.
     *
     * @param historyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public HistoryDTO save(HistoryDTO historyDTO) {
        log.debug("Request to save History : {}", historyDTO);
        History history = historyMapper.toEntity(historyDTO);
        history = historyRepository.save(history);
        return historyMapper.toDto(history);
    }

    /**
     * Get all the histories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<HistoryDTO> findAll() {
        log.debug("Request to get all Histories");
        return historyRepository.findAll().stream()
            .map(historyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one history by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public HistoryDTO findOne(Long id) {
        log.debug("Request to get History : {}", id);
        History history = historyRepository.findOne(id);
        return historyMapper.toDto(history);
    }

    /**
     * Delete the history by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete History : {}", id);
        historyRepository.delete(id);
    }
}
