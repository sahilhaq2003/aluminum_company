package com.aluminium.backend.dto;

import java.util.List;

public class ProjectDtos {

    public record ProjectSummaryDto(Long id, String title, String description, String coverImageUrl) {
    }

    public record ProjectImageDto(Long id, String imageUrl, String caption) {
    }

    public record ProjectCategoryDto(Long id, String name, List<ProjectImageDto> images) {
    }

    public record ProjectDetailDto(Long id, String title, String description, String coverImageUrl,
                                   List<ProjectCategoryDto> categories) {
    }
}
