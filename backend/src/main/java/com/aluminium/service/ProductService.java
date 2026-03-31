package com.aluminium.service;

import com.aluminium.dto.ProductDtos.ProductDto;
import com.aluminium.model.Product;
import com.aluminium.repository.ProductRepository;
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
                product.getCategory().getName(),
                product.getPrice(),
                product.getStock()
        );
    }
}
