package com.ec.opensesame.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.ec.opensesame.domain.enumeration.Status;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",unique= true)
    private String name;

    @Column(name = "createdon")
    private LocalDate createdon;

    @Column(name = "createdby")
    private String createdby;

    @Lob
    @Column(name = "jhi_file")
    private byte[] file;

    @Column(name = "jhi_file_content_type")
    private String fileContentType;

    @Column(name = "duedate")
    private LocalDate duedate;

    @Enumerated(EnumType.STRING)
    @Column(name = "currstate")
    private Status currstate;

    @Enumerated(EnumType.STRING)
    @Column(name = "laststate")
    private Status laststate;

    @Column(name = "country")
    private String country;

    @OneToOne
    @JoinColumn(unique = true)
    private Version currversion;

    @OneToMany(mappedBy = "document")
    @JsonIgnore
    private Set<History> histories = new HashSet<>();

    @OneToMany(mappedBy = "document")
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "document")
    @JsonIgnore
    private Set<Version> versions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Document name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreatedon() {
        return createdon;
    }

    public Document createdon(LocalDate createdon) {
        this.createdon = createdon;
        return this;
    }

    public void setCreatedon(LocalDate createdon) {
        this.createdon = createdon;
    }

    public String getCreatedby() {
        return createdby;
    }

    public Document createdby(String createdby) {
        this.createdby = createdby;
        return this;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public byte[] getFile() {
        return file;
    }

    public Document file(byte[] file) {
        this.file = file;
        return this;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public Document fileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
        return this;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public LocalDate getDuedate() {
        return duedate;
    }

    public Document duedate(LocalDate duedate) {
        this.duedate = duedate;
        return this;
    }

    public void setDuedate(LocalDate duedate) {
        this.duedate = duedate;
    }

    public Status getCurrstate() {
        return currstate;
    }

    public Document currstate(Status currstate) {
        this.currstate = currstate;
        return this;
    }

    public void setCurrstate(Status currstate) {
        this.currstate = currstate;
    }

    public Status getLaststate() {
        return laststate;
    }

    public Document laststate(Status laststate) {
        this.laststate = laststate;
        return this;
    }

    public void setLaststate(Status laststate) {
        this.laststate = laststate;
    }

    public Version getCurrversion() {
        return currversion;
    }

    public Document currversion(Version version) {
        this.currversion = version;
        return this;
    }

    public void setCurrversion(Version version) {
        this.currversion = version;
    }

    public Set<History> getHistories() {
        return histories;
    }

    public Document histories(Set<History> histories) {
        this.histories = histories;
        return this;
    }

    public Document addHistory(History history) {
        this.histories.add(history);
        history.setDocument(this);
        return this;
    }

    public Document removeHistory(History history) {
        this.histories.remove(history);
        history.setDocument(null);
        return this;
    }

    public void setHistories(Set<History> histories) {
        this.histories = histories;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Document comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Document addComment(Comment comment) {
        this.comments.add(comment);
        comment.setDocument(this);
        return this;
    }

    public Document removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setDocument(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Version> getVersions() {
        return versions;
    }

    public Document versions(Set<Version> versions) {
        this.versions = versions;
        return this;
    }

    public Document addVersion(Version version) {
        this.versions.add(version);
        version.setDocument(this);
        return this;
    }

    public Document removeVersion(Version version) {
        this.versions.remove(version);
        version.setDocument(null);
        return this;
    }

    public void setVersions(Set<Version> versions) {
        this.versions = versions;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountry(){
        return country;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createdon='" + getCreatedon() + "'" +
            ", createdby='" + getCreatedby() + "'" +
            ", file='" + getFile() + "'" +
            ", fileContentType='" + getFileContentType() + "'" +
            ", duedate='" + getDuedate() + "'" +
            ", currstate='" + getCurrstate() + "'" +
            ", laststate='" + getLaststate() + "'" +
            "}";
    }
}
