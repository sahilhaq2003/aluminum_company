package com.aluminium.backend.service;

import com.aluminium.backend.dto.ProductDtos.ProductDto;
import com.aluminium.backend.model.Product;
import com.aluminium.backend.repository.ProductRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getCreatedAt).reversed())
                .map(this::toDto)
                .toList();
    }

    private ProductDto toDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }
}
