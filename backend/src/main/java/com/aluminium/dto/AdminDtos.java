package com.aluminium.dto;

public class AdminDtos {

    public record ProjectRequest(String title, String description, String coverImageUrl, String client, String location, Integer year, String challenge, String solution, String scope, String results) {
    }

    public record ProjectCategoryRequest(String name, Long projectId) {
    }

    public record ProjectImageRequest(String imageUrl, String caption, Long categoryId) {
    }

    public record ProductCategoryRequest(String name) {
    }

    public record ProductRequest(String name, String description, String imageUrl, Long categoryId, String price, Integer stock) {
    }
}
