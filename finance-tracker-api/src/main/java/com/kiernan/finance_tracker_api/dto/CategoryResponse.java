package com.kiernan.finance_tracker_api.dto;

public class CategoryResponse {

    private Integer id;
    private String label;
    

    public CategoryResponse(Integer id, String label) {
        this.id = id;
        this.label = label;
    }
    

    public Integer getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

}
