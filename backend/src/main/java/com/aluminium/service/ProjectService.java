package com.aluminium.service;

import com.aluminium.dto.ProjectDtos.ProjectCategoryDto;
import com.aluminium.dto.ProjectDtos.ProjectDetailDto;
import com.aluminium.dto.ProjectDtos.ProjectImageDto;
import com.aluminium.dto.ProjectDtos.ProjectSummaryDto;
import com.aluminium.model.Project;
import com.aluminium.model.ProjectCategory;
import com.aluminium.model.ProjectImage;
import com.aluminium.repository.ProjectRepository;
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
        String categoryName = project.getCategories().stream()
                .findFirst()
                .map(ProjectCategory::getName)
                .orElse("Uncategorized");
        return new ProjectSummaryDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCoverImageUrl(),
                project.getClient(),
                project.getLocation(),
                project.getYear(),
                categoryName
        );
    }

    private ProjectDetailDto toDetailDto(Project project) {
        List<ProjectCategoryDto> categoryDtos = project.getCategories().stream()
                .map(this::toCategoryDto)
                .toList();
        return new ProjectDetailDto(project.getId(), project.getTitle(), project.getDescription(),
                project.getCoverImageUrl(), project.getClient(), project.getLocation(), project.getYear(),
                project.getChallenge(), project.getSolution(), project.getScope(), project.getResults(),
                categoryDtos);
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
