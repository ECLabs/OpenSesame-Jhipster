package com.ec.opensesame.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ec.opensesame.service.DocumentService;
import com.ec.opensesame.web.rest.errors.BadRequestAlertException;
import com.ec.opensesame.web.rest.util.HeaderUtil;
import com.ec.opensesame.web.rest.util.PaginationUtil;
import com.ec.opensesame.service.dto.DocumentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import com.ec.opensesame.domain.enumeration.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Document.
 */
@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger log = LoggerFactory.getLogger(DocumentResource.class);

    private static final String ENTITY_NAME = "document";

    private final DocumentService documentService;

    public DocumentResource(DocumentService documentService) {
        this.documentService = documentService;
    }

    /**
     * POST  /documents : Create a new document.
     *
     * @param documentDTO the documentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentDTO, or with status 400 (Bad Request) if the document has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documents")
    @Timed
    public ResponseEntity<DocumentDTO> createDocument(@RequestBody DocumentDTO documentDTO) throws URISyntaxException {
        log.debug("REST request to save Document : {}", documentDTO);
        if (documentDTO.getId() != null) {
            throw new BadRequestAlertException("A new document cannot already have an ID", ENTITY_NAME, "idexists");
        }
        documentDTO.setLaststate(Status.AUTHOR);
        documentDTO.setCurrstate(Status.AUTHOR);
        
        DocumentDTO result = documentService.save(documentDTO);
        return ResponseEntity.created(new URI("/api/documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documents : Updates an existing document.
     *
     * @param documentDTO the documentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentDTO,
     * or with status 400 (Bad Request) if the documentDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documents")
    @Timed
    public ResponseEntity<DocumentDTO> updateDocument(@RequestBody DocumentDTO documentDTO) throws URISyntaxException {
        log.debug("REST request to update Document : {}", documentDTO);
        if (documentDTO.getId() == null) {
            return createDocument(documentDTO);
        }
        DocumentDTO result = documentService.save(documentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documents : get all the documents.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of documents in body
     */
    @GetMapping("/documents")
    @Timed
    public ResponseEntity<List<DocumentDTO>> getAllDocuments(Pageable pageable) {
        log.debug("REST request to get a page of Documents");
        Page<DocumentDTO> page = documentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/documents");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /documents/:id : get the "id" document.
     *
     * @param id the id of the documentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/documents/{id}")
    @Timed
    public ResponseEntity<DocumentDTO> getDocument(@PathVariable Long id) {
        log.debug("REST request to get Document : {}", id);
        DocumentDTO documentDTO = documentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentDTO));
    }


    /**
     * POST  /documents/:id/approve : approve the "id" document to whatever is next.
     *
     * @param id the id of the documentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentDTO, or with status 404 (Not Found)
     */
    @PostMapping("/documents/{id}/approve")
    @Timed
    public ResponseEntity<DocumentDTO> approveDocument(@PathVariable Long id) {
        log.debug("REST request to get Document : {}", id);
        DocumentDTO documentDTO = documentService.findOne(id);
        //Will have to make sure that this doesn't cycle back to AUTHOR once done
        Status nextVal = documentDTO.getCurrstate().getNext();
        if(documentDTO.getCurrstate() != documentDTO.getLaststate()){
          nextVal = documentDTO.getLaststate();
        }

        if(nextVal != null){
            documentDTO.setCurrstate(nextVal);
            documentDTO.setLaststate(nextVal);
            DocumentDTO result = documentService.save(documentDTO);
            return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
        }
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentDTO));
    }


    /**
     * POST  /documents/:id/deny : approve the "id" document to whatever is next.
     *
     * @param id the id of the documentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentDTO, or with status 404 (Not Found)
     */
    @PostMapping("/documents/{id}/deny")
    @Timed
    public ResponseEntity<DocumentDTO> denyDocument(@PathVariable Long id,@RequestBody String status) {
        log.debug("REST request to get Document : {}", id);
        DocumentDTO documentDTO = documentService.findOne(id);
        //In a real system, we would make sure that this isn't a bad enum value
        Status val = Status.get(status);
        documentDTO.setCurrstate(val);
        DocumentDTO result = documentService.save(documentDTO);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));

    }

    /**
     * DELETE  /documents/:id : delete the "id" document.
     *
     * @param id the id of the documentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documents/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        log.debug("REST request to delete Document : {}", id);
        documentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
