package com.kiernan.finance_tracker_api.events;

import com.kiernan.finance_tracker_api.entity.CategoryEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KeywordUpdatedEvent {

    private final String keyword;
    private final CategoryEntity category;
    
}
