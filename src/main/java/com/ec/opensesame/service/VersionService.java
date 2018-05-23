package com.ec.opensesame.service;

import com.ec.opensesame.service.dto.VersionDTO;
import java.util.List;

/**
 * Service Interface for managing Version.
 */
public interface VersionService {

    /**
     * Save a version.
     *
     * @param versionDTO the entity to save
     * @return the persisted entity
     */
    VersionDTO save(VersionDTO versionDTO);

    /**
     * Get all the versions.
     *
     * @return the list of entities
     */
    List<VersionDTO> findAll();

    /**
     * Get the "id" version.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VersionDTO findOne(Long id);

    /**
     * Delete the "id" version.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
