package com.kiernan.finance_tracker_api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kiernan.finance_tracker_api.entity.*;
import com.kiernan.finance_tracker_api.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Map<Integer, String> getCategoryLookup() {
        List<CategoryEntity> categories = categoryRepository.findAll();

        return toCategoryMap(categories);
    }

    private Map<Integer, String> toCategoryMap(List<CategoryEntity> categories) {
        Map<Integer, String> categoryMap = new HashMap<>();

        for (CategoryEntity category : categories) {
            categoryMap.put(category.getId(), category.getCategory());
        }

        return categoryMap;
    }
}
