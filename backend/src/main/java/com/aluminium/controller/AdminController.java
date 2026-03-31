package com.aluminium.controller;

import com.aluminium.dto.AdminDtos.ProductCategoryRequest;
import com.aluminium.dto.AdminDtos.ProductRequest;
import com.aluminium.dto.AdminDtos.ProjectCategoryRequest;
import com.aluminium.dto.AdminDtos.ProjectImageRequest;
import com.aluminium.dto.AdminDtos.ProjectRequest;
import com.aluminium.dto.ProductDtos.ProductDto;
import com.aluminium.dto.ProjectDtos.ProjectCategoryDto;
import com.aluminium.dto.ProjectDtos.ProjectSummaryDto;
import com.aluminium.model.Product;
import com.aluminium.model.ProductCategory;
import com.aluminium.model.Project;
import com.aluminium.model.ProjectCategory;
import com.aluminium.model.ProjectImage;
import com.aluminium.repository.ProductCategoryRepository;
import com.aluminium.repository.ProductRepository;
import com.aluminium.repository.ProjectCategoryRepository;
import com.aluminium.repository.ProjectImageRepository;
import com.aluminium.repository.ProjectRepository;
import com.aluminium.service.ProductService;
import com.aluminium.service.ProjectService;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    public record IdNameDto(Long id, String name) {
    }

    private final ProjectRepository projectRepository;
    private final ProjectCategoryRepository projectCategoryRepository;
    private final ProjectImageRepository projectImageRepository;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProjectService projectService;
    private final ProductService productService;

    public AdminController(ProjectRepository projectRepository, ProjectCategoryRepository projectCategoryRepository,
                           ProjectImageRepository projectImageRepository, ProductRepository productRepository,
                           ProductCategoryRepository productCategoryRepository,
                           ProjectService projectService,
                           ProductService productService) {
        this.projectRepository = projectRepository;
        this.projectCategoryRepository = projectCategoryRepository;
        this.projectImageRepository = projectImageRepository;
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.projectService = projectService;
        this.productService = productService;
    }

    @GetMapping("/projects")
    public List<ProjectSummaryDto> getProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/products")
    public List<ProductDto> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/product-categories")
    public List<IdNameDto> getProductCategories() {
        return productCategoryRepository.findAll().stream()
                .map(category -> new IdNameDto(category.getId(), category.getName()))
                .toList();
    }

    @GetMapping("/projects/{projectId}/project-categories")
    public List<ProjectCategoryDto> getProjectCategories(@PathVariable Long projectId) {
        return projectService.getProjectById(projectId).categories();
    }

    @PostMapping("/projects")
    @ResponseStatus(HttpStatus.CREATED)
    public Project createProject(@RequestBody ProjectRequest request) {
        Project project = new Project();
        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setCoverImageUrl(request.coverImageUrl());
        project.setClient(request.client());
        project.setLocation(request.location());
        project.setYear(request.year());
        project.setChallenge(request.challenge());
        project.setSolution(request.solution());
        project.setScope(request.scope());
        project.setResults(request.results());
        return projectRepository.save(project);
    }

    @PutMapping("/projects/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody ProjectRequest request) {
        Project project = projectRepository.findById(id).orElseThrow();
        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setCoverImageUrl(request.coverImageUrl());
        project.setClient(request.client());
        project.setLocation(request.location());
        project.setYear(request.year());
        project.setChallenge(request.challenge());
        project.setSolution(request.solution());
        project.setScope(request.scope());
        project.setResults(request.results());
        return projectRepository.save(project);
    }

    @DeleteMapping("/projects/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }

    @PostMapping("/project-categories")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createProjectCategory(@RequestBody ProjectCategoryRequest request) {
        Project project = projectRepository.findById(request.projectId()).orElseThrow();
        ProjectCategory category = new ProjectCategory();
        category.setName(request.name());
        category.setProject(project);
        ProjectCategory saved = projectCategoryRepository.save(category);
        return Map.of("id", saved.getId(), "name", saved.getName(), "projectId", project.getId());
    }

    @PostMapping("/project-images")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createProjectImage(@RequestBody ProjectImageRequest request) {
        ProjectCategory category = projectCategoryRepository.findById(request.categoryId()).orElseThrow();
        ProjectImage image = new ProjectImage();
        image.setCaption(request.caption());
        image.setImageUrl(request.imageUrl());
        image.setCategory(category);
        ProjectImage saved = projectImageRepository.save(image);
        return Map.of("id", saved.getId(), "imageUrl", saved.getImageUrl(), "caption", saved.getCaption(), "categoryId", category.getId());
    }

    @PostMapping("/product-categories")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductCategory createProductCategory(@RequestBody ProductCategoryRequest request) {
        ProductCategory category = new ProductCategory();
        category.setName(request.name());
        return productCategoryRepository.save(category);
    }

    @PostMapping("/products")
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody ProductRequest request) {
        ProductCategory category = productCategoryRepository.findById(request.categoryId()).orElseThrow();
        Product product = new Product();
        product.setName(request.name());
        product.setDescription(request.description());
        product.setImageUrl(request.imageUrl());
        product.setCategory(category);
        product.setPrice(request.price());
        product.setStock(request.stock());
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
        Product product = productRepository.findById(id).orElseThrow();
        ProductCategory category = productCategoryRepository.findById(request.categoryId()).orElseThrow();
        product.setName(request.name());
        product.setDescription(request.description());
        product.setImageUrl(request.imageUrl());
        product.setCategory(category);
        product.setPrice(request.price());
        product.setStock(request.stock());
        return productRepository.save(product);
    }

    @DeleteMapping("/project-categories/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProjectCategory(@PathVariable Long id) {
        projectCategoryRepository.deleteById(id);
    }

    @DeleteMapping("/project-images/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProjectImage(@PathVariable Long id) {
        projectImageRepository.deleteById(id);
    }

    @DeleteMapping("/products/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    @DeleteMapping("/product-categories/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProductCategory(@PathVariable Long id) {
        productCategoryRepository.deleteById(id);
    }
}
