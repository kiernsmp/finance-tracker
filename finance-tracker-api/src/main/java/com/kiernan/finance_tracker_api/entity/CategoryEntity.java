package com.kiernan.finance_tracker_api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class CategoryEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public static final String DEFAULT_CATEGORY_NAME = "-";


    public CategoryEntity() {
        // Required by JPA
    }

    public static String defaultCategory() {
        return DEFAULT_CATEGORY_NAME;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
}
