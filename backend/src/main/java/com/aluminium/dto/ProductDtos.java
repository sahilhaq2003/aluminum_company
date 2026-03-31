package com.aluminium.dto;

public class ProductDtos {

    public record ProductDto(Long id, String name, String description, String imageUrl, Long categoryId, String categoryName, String price, Integer stock) {
    }
}
