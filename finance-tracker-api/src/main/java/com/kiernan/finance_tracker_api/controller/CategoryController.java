package com.kiernan.finance_tracker_api.controller;

import com.kiernan.finance_tracker_api.service.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.kiernan.finance_tracker_api.dto.*;
import com.kiernan.finance_tracker_api.entity.CategoryEntity;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private static final Logger log = LoggerFactory.getLogger(KeywordController.class);

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")    
    public List<CategoryResponse> getCategoryNames() {
        
        log.info("\n");
        log.info("ENTERING GET ALL CATEGORIES");
        return categoryService.getAllCategories();
    }

    @PostMapping("/add")
    public ResponseEntity<CategoryEntity> addCategory(
            @RequestBody AddCategoryRequest request
    ) {
        log.info("POST /categories/add received, adding category {}", request.getCategoryName());

        CategoryEntity newCategory = categoryService.addCategory(request.getCategoryName());
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);

    }

    @PatchMapping("/update-display-order")
    public void patchDisplayOrder(@RequestBody CategoryDisplayOrderRequest request) {
        categoryService.updateCategoryDisplayOrder(request);
    }
    
}
