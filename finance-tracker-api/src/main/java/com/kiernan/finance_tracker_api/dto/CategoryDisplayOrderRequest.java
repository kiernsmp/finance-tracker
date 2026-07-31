package com.kiernan.finance_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryDisplayOrderRequest {
    private final Integer categoryId;
    private final Integer newDisplayOrder;
}
