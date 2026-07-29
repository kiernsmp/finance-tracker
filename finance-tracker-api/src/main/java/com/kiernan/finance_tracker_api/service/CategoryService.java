package com.kiernan.finance_tracker_api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.kiernan.finance_tracker_api.dto.CategoryResponse;
import com.kiernan.finance_tracker_api.entity.*;
import com.kiernan.finance_tracker_api.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {
        List<CategoryEntity> entities = categoryRepository.findAll();
        List<CategoryResponse> categoryResponses = new ArrayList<>();
        for (var category : entities) {
            categoryResponses.add(new CategoryResponse(category.getId(), category.getName()));
        }
        return categoryResponses;
    }

    public Map<Integer, CategoryEntity> getCategoryMap() {
        return categoryRepository.findAll().stream()
                .collect(Collectors.toMap(CategoryEntity::getId, category -> category));
    }

    public CategoryEntity getDefaultEntity() {
        return categoryRepository.findByName(CategoryEntity.DEFAULT_CATEGORY_NAME);
    }
}
