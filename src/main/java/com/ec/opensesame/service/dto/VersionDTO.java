package com.ec.opensesame.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Version entity.
 */
public class VersionDTO implements Serializable {

    private Long id;

    private LocalDate createdon;

    private String createdby;

    @Lob
    private byte[] file;
    private String fileContentType;

    private Long documentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreatedon() {
        return createdon;
    }

    public void setCreatedon(LocalDate createdon) {
        this.createdon = createdon;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VersionDTO versionDTO = (VersionDTO) o;
        if(versionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), versionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VersionDTO{" +
            "id=" + getId() +
            ", createdon='" + getCreatedon() + "'" +
            ", createdby='" + getCreatedby() + "'" +
            ", file='" + getFile() + "'" +
            "}";
    }
}
