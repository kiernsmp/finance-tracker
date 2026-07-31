package com.kiernan.finance_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponse {

    private Integer id;
    private String label;
    private Integer displayOrder;
    
}
