package com.aluminium.controller;

import com.aluminium.dto.ProductDtos.ProductDto;
import com.aluminium.dto.ProjectDtos.ProjectDetailDto;
import com.aluminium.dto.ProjectDtos.ProjectSummaryDto;
import com.aluminium.service.ProductService;
import com.aluminium.service.ProjectService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final ProjectService projectService;
    private final ProductService productService;

    public PublicController(ProjectService projectService, ProductService productService) {
        this.projectService = projectService;
        this.productService = productService;
    }

    @GetMapping("/projects")
    public List<ProjectSummaryDto> getProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/projects/{id}")
    public ProjectDetailDto getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @GetMapping("/products")
    public List<ProductDto> getProducts() {
        return productService.getAllProducts();
    }
}
