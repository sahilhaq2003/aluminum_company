package com.aluminium.backend.repository;

import com.aluminium.backend.model.ProjectCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, Long> {
}
