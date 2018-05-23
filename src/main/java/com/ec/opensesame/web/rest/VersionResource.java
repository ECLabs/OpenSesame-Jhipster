package com.ec.opensesame.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ec.opensesame.service.VersionService;
import com.ec.opensesame.web.rest.errors.BadRequestAlertException;
import com.ec.opensesame.web.rest.util.HeaderUtil;
import com.ec.opensesame.service.dto.VersionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Version.
 */
@RestController
@RequestMapping("/api")
public class VersionResource {

    private final Logger log = LoggerFactory.getLogger(VersionResource.class);

    private static final String ENTITY_NAME = "version";

    private final VersionService versionService;

    public VersionResource(VersionService versionService) {
        this.versionService = versionService;
    }

    /**
     * POST  /versions : Create a new version.
     *
     * @param versionDTO the versionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new versionDTO, or with status 400 (Bad Request) if the version has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/versions")
    @Timed
    public ResponseEntity<VersionDTO> createVersion(@RequestBody VersionDTO versionDTO) throws URISyntaxException {
        log.debug("REST request to save Version : {}", versionDTO);
        if (versionDTO.getId() != null) {
            throw new BadRequestAlertException("A new version cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VersionDTO result = versionService.save(versionDTO);
        return ResponseEntity.created(new URI("/api/versions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /versions : Updates an existing version.
     *
     * @param versionDTO the versionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated versionDTO,
     * or with status 400 (Bad Request) if the versionDTO is not valid,
     * or with status 500 (Internal Server Error) if the versionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/versions")
    @Timed
    public ResponseEntity<VersionDTO> updateVersion(@RequestBody VersionDTO versionDTO) throws URISyntaxException {
        log.debug("REST request to update Version : {}", versionDTO);
        if (versionDTO.getId() == null) {
            return createVersion(versionDTO);
        }
        VersionDTO result = versionService.save(versionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, versionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /versions : get all the versions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of versions in body
     */
    @GetMapping("/versions")
    @Timed
    public List<VersionDTO> getAllVersions() {
        log.debug("REST request to get all Versions");
        return versionService.findAll();
        }

    /**
     * GET  /versions/:id : get the "id" version.
     *
     * @param id the id of the versionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the versionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/versions/{id}")
    @Timed
    public ResponseEntity<VersionDTO> getVersion(@PathVariable Long id) {
        log.debug("REST request to get Version : {}", id);
        VersionDTO versionDTO = versionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(versionDTO));
    }

    /**
     * DELETE  /versions/:id : delete the "id" version.
     *
     * @param id the id of the versionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/versions/{id}")
    @Timed
    public ResponseEntity<Void> deleteVersion(@PathVariable Long id) {
        log.debug("REST request to delete Version : {}", id);
        versionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
