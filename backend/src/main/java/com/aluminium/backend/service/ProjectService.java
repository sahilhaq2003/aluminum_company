package com.aluminium.backend.service;

import com.aluminium.backend.dto.ProjectDtos.ProjectCategoryDto;
import com.aluminium.backend.dto.ProjectDtos.ProjectDetailDto;
import com.aluminium.backend.dto.ProjectDtos.ProjectImageDto;
import com.aluminium.backend.dto.ProjectDtos.ProjectSummaryDto;
import com.aluminium.backend.model.Project;
import com.aluminium.backend.model.ProjectCategory;
import com.aluminium.backend.model.ProjectImage;
import com.aluminium.backend.repository.ProjectRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectSummaryDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .sorted(Comparator.comparing(Project::getCreatedAt).reversed())
                .map(this::toSummaryDto)
                .toList();
    }

    public ProjectDetailDto getProjectById(Long id) {
        Project project = projectRepository.findWithCategoriesAndImagesById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
        return toDetailDto(project);
    }

    private ProjectSummaryDto toSummaryDto(Project project) {
        return new ProjectSummaryDto(project.getId(), project.getTitle(), project.getDescription(), project.getCoverImageUrl());
    }

    private ProjectDetailDto toDetailDto(Project project) {
        List<ProjectCategoryDto> categoryDtos = project.getCategories().stream()
                .map(this::toCategoryDto)
                .toList();
        return new ProjectDetailDto(project.getId(), project.getTitle(), project.getDescription(),
                project.getCoverImageUrl(), categoryDtos);
    }

    private ProjectCategoryDto toCategoryDto(ProjectCategory category) {
        List<ProjectImageDto> imageDtos = category.getImages().stream()
                .map(this::toImageDto)
                .toList();
        return new ProjectCategoryDto(category.getId(), category.getName(), imageDtos);
    }

    private ProjectImageDto toImageDto(ProjectImage image) {
        return new ProjectImageDto(image.getId(), image.getImageUrl(), image.getCaption());
    }
}
