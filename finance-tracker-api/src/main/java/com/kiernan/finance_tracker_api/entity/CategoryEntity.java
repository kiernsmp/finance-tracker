package com.kiernan.finance_tracker_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class CategoryEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @Column(name = "display_order")
    private Integer displayOrder;
    public static final String DEFAULT_CATEGORY_NAME = "-";

    public static String defaultCategory() {
        return DEFAULT_CATEGORY_NAME;
    }

}
