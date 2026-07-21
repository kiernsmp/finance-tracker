package com.kiernan.finance_tracker_api.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "keywords")

public class KeywordEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String keyword;

    @Column(name = "category_id")
    private Integer categoryId;

    public KeywordEntity() {
        // Required by JPA
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

}
