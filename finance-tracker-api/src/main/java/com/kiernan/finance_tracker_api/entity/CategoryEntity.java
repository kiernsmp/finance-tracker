package com.kiernan.finance_tracker_api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class CategoryEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String category;


    public CategoryEntity() {
        // Required by JPA
    }

    public Integer getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
}
