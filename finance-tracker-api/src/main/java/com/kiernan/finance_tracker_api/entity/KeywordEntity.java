package com.kiernan.finance_tracker_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "keywords")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeywordEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String keyword;

    @Column(name = "category_id")
    private Integer categoryId;

    public KeywordEntity(String keyword, Integer categoryId) {
        this.keyword = keyword;
        this.categoryId = categoryId;
    }
    

}
