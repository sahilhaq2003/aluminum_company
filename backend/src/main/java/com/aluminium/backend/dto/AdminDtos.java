package com.aluminium.backend.dto;

public class AdminDtos {

    public record ProjectRequest(String title, String description, String coverImageUrl) {
    }

    public record ProjectCategoryRequest(String name, Long projectId) {
    }

    public record ProjectImageRequest(String imageUrl, String caption, Long categoryId) {
    }

    public record ProductCategoryRequest(String name) {
    }

    public record ProductRequest(String name, String description, String imageUrl, Long categoryId) {
    }
}
