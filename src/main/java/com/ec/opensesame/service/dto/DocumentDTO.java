package com.ec.opensesame.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import java.util.Set;

import com.ec.opensesame.domain.enumeration.Status;

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

private Long currversionId;

private Long versionCounter;

private Set<VersionDTO> versions;

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public Long getVersionCounter() {
    return versionCounter;
}

public void setVersionCounter(Long versionCounter) {
    this.versionCounter = versionCounter;
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

public Long getCurrversionId() {
    return currversionId;
}

public void addVersion(VersionDTO version) {
    versions.add(version);
}

public Set<VersionDTO> getVersions() {
    return this.versions;
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

public void setCurrversionId(Long versionId) {
    this.currversionId = versionId;
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