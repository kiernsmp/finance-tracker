package com.kiernan.finance_tracker_api.controller;

import com.kiernan.finance_tracker_api.service.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.kiernan.finance_tracker_api.dto.*;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")    
    public List<CategoryResponse> getCategoryNames() {
        
        return categoryService.getAllCategories();
    }
    
}
