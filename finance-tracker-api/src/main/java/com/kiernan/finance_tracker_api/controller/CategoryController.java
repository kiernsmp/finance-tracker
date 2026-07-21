package com.kiernan.finance_tracker_api.controller;

import com.kiernan.finance_tracker_api.entity.CategoryEntity;
import com.kiernan.finance_tracker_api.service.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")    
    public List<CategoryEntity> getCategoryNames() {
        
        return categoryService.getAllCategories();
    }
    
}
