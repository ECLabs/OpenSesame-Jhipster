package com.ec.opensesame.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.ec.opensesame.domain.enumeration.Status;
import com.ec.opensesame.domain.Version;
import java.util.Set;

/**
 * A DTO for the Document entity.
 */
public class DocumentDTO implements Serializable {

    private Long id;

    private String name;

    private LocalDate createdon;

    private String createdby;

    @Lob
    private byte[] file;
    private String fileContentType;

    private LocalDate duedate;

    private Status currstate;

    private Status laststate;

    private String country;

    private Long timeElapsed;

    private Version currversion;

    private Long currVersionId;

    private Set<DocumentDTO> versions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public LocalDate getDuedate() {
        return duedate;
    }

    public void setDuedate(LocalDate duedate) {
        this.duedate = duedate;
    }

    public Status getCurrstate() {
        return currstate;
    }

    public void setCurrstate(Status currstate) {
        this.currstate = currstate;
    }

    public Status getLaststate() {
        return laststate;
    }

    public void setLaststate(Status laststate) {
        this.laststate = laststate;
    }

    public DocumentDTO getCurrversion() {
        return this;
    }

    public void setCurrversion(DocumentDTO version) {
        this.id = version.id;
        this.name = version.name;
        this.createdon = version.createdon;
        this.createdby = version.createdby;
        this.file = version.file;
        this.fileContentType = version.fileContentType;
        this.duedate = version.duedate;
        this.currstate = version.currstate;
        this.laststate = version.laststate;
        this.country = version.country;
        this.timeElapsed = version.timeElapsed;
        this.currversion = version.currversion;
        this.versions = version.versions;
    }

    public Long getCurrversionId() {
        return currVersionId;
    }

    public void setCurrversionId(Long id) {
        this.currVersionId = id;
    }

    public void setCountry(String country) {
      this.country = country;
    }
    
    public String getCountry() {
      return country;
    }

    public void setTimeElapsed(Long timeElapsed) {
        this.timeElapsed = timeElapsed;
    }

    public Long getTimeElapsed() {
        return timeElapsed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentDTO documentDTO = (DocumentDTO) o;
        if(documentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createdon='" + getCreatedon() + "'" +
            ", createdby='" + getCreatedby() + "'" +
            ", file='" + getFile() + "'" +
            ", duedate='" + getDuedate() + "'" +
            ", currstate='" + getCurrstate() + "'" +
            ", laststate='" + getLaststate() + "'" +
            ", country='" + getCountry() + "'" +
            ", time elapsed='" + getTimeElapsed() + "'" +
            "}";
    }
}
