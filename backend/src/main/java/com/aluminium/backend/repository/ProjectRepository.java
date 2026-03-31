package com.aluminium.backend.repository;

import com.aluminium.backend.model.Project;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @EntityGraph(attributePaths = {"categories", "categories.images"})
    List<Project> findAll();

    @EntityGraph(attributePaths = {"categories", "categories.images"})
    java.util.Optional<Project> findWithCategoriesAndImagesById(Long id);
}
