package com.ec.opensesame.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A History.
 */
@Entity
@Table(name = "history")
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "createdon")
    private LocalDate createdon;

    @Column(name = "description")
    private String description;

    @Column(name = "createdfor")
    private String createdfor;

    @ManyToOne
    private Document document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreatedon() {
        return createdon;
    }

    public History createdon(LocalDate createdon) {
        this.createdon = createdon;
        return this;
    }

    public void setCreatedon(LocalDate createdon) {
        this.createdon = createdon;
    }

    public String getDescription() {
        return description;
    }

    public History description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedfor() {
        return createdfor;
    }

    public History createdfor(String createdfor) {
        this.createdfor = createdfor;
        return this;
    }

    public void setCreatedfor(String createdfor) {
        this.createdfor = createdfor;
    }

    public Document getDocument() {
        return document;
    }

    public History document(Document document) {
        this.document = document;
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
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
        History history = (History) o;
        if (history.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), history.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "History{" +
            "id=" + getId() +
            ", createdon='" + getCreatedon() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdfor='" + getCreatedfor() + "'" +
            "}";
    }
}
