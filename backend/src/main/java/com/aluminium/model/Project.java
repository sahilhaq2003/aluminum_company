package com.aluminium.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Project extends BaseEntity {

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = true, length = 120)
    private String client;

    @Column(nullable = true, length = 120)
    private String location;

    @Column(nullable = true)
    private Integer year;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = true, length = 2000)
    private String challenge;

    @Column(nullable = true, length = 2000)
    private String solution;

    @Column(nullable = true, length = 2000)
    private String scope;

    @Column(nullable = true, length = 2000)
    private String results;

    @Column(nullable = false, length = 1024)
    private String coverImageUrl;

    @OneToMany(mappedBy = "project")
    private Set<ProjectCategory> categories = new HashSet<>();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getChallenge() {
        return challenge;
    }

    public void setChallenge(String challenge) {
        this.challenge = challenge;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getResults() {
        return results;
    }

    public void setResults(String results) {
        this.results = results;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public Set<ProjectCategory> getCategories() {
        return categories;
    }
}
