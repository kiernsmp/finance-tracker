package com.kiernan.finance_tracker_api.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryNoteRequest {
    private final Integer categoryId;
    private final LocalDate month;
    private final String note;
    
}
