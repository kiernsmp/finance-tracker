package com.kiernan.finance_tracker_api.service;


import java.util.List;

import org.springframework.stereotype.Service;
import com.kiernan.finance_tracker_api.dto.CategoryResponse;
import com.kiernan.finance_tracker_api.entity.*;
import com.kiernan.finance_tracker_api.repository.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map((CategoryEntity category) -> new CategoryResponse(category.getId(), category.getName()))
                .toList();
    }

    public CategoryEntity getDefaultEntity() {
        return categoryRepository.findByName(CategoryEntity.DEFAULT_CATEGORY_NAME);
    }

    public CategoryEntity getCategory(Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + categoryId));
    }
}
