package com.aluminium.backend.dto;

public class ProductDtos {

    public record ProductDto(Long id, String name, String description, String imageUrl, Long categoryId, String categoryName) {
    }
}
