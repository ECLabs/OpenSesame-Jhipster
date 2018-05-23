package com.ec.opensesame.service;

import com.ec.opensesame.service.dto.HistoryDTO;
import java.util.List;

/**
 * Service Interface for managing History.
 */
public interface HistoryService {

    /**
     * Save a history.
     *
     * @param historyDTO the entity to save
     * @return the persisted entity
     */
    HistoryDTO save(HistoryDTO historyDTO);

    /**
     * Get all the histories.
     *
     * @return the list of entities
     */
    List<HistoryDTO> findAll();

    /**
     * Get the "id" history.
     *
     * @param id the id of the entity
     * @return the entity
     */
    HistoryDTO findOne(Long id);

    /**
     * Delete the "id" history.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
