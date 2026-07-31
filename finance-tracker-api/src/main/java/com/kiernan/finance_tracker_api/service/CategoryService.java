package com.kiernan.finance_tracker_api.service;


import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
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
                .sorted(Comparator.comparing(
                    CategoryEntity::getDisplayOrder,
                    Comparator.nullsLast(Integer::compareTo)))
                .map((CategoryEntity category) -> new CategoryResponse(category.getId(), category.getName(), category.getDisplayOrder()))
                .toList();
    }

    public Map<Integer, CategoryEntity> getCategoryMap() {
        return categoryRepository.findAll().stream()
                .collect(Collectors.toMap(
                    CategoryEntity::getId,
                    category -> category
                ) );
    }

    public CategoryEntity getDefaultEntity() {
        return categoryRepository.findByName(CategoryEntity.DEFAULT_CATEGORY_NAME);
    }
    public CategoryEntity getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + categoryId));
    }

    public CategoryEntity addCategory(String categoryName) {
        Integer nextDisplayOrder = categoryRepository.findMaxDisplayOrder()
            .orElse(0) + 1;
        return categoryRepository.save( new CategoryEntity(null, categoryName, nextDisplayOrder));
    }

}
