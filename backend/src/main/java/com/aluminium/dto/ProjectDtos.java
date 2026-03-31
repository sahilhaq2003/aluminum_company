package com.aluminium.dto;

import java.util.List;

public class ProjectDtos {

    public record ProjectSummaryDto(Long id, String title, String description, String coverImageUrl, String client, String location, Integer year, String categoryName) {
    }

    public record ProjectImageDto(Long id, String imageUrl, String caption) {
    }

    public record ProjectCategoryDto(Long id, String name, List<ProjectImageDto> images) {
    }

    public record ProjectDetailDto(Long id, String title, String description, String coverImageUrl, String client, String location, Integer year, String challenge, String solution, String scope, String results,
                                   List<ProjectCategoryDto> categories) {
    }
}
