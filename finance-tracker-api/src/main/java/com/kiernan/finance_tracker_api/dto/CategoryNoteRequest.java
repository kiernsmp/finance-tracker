package com.kiernan.finance_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryNoteRequest {
    private final Integer categoryId;
    private final String month;
    private final String note;
    
}
