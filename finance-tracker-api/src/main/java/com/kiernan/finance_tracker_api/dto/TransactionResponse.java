package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.kiernan.finance_tracker_api.entity.CategoryEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionResponse {

    private Integer id;
    private LocalDate date;
    private BigDecimal amount;
    private String description;
    private String notes;
    private CategoryEntity category;
    private Boolean approved;
    private Boolean locked;

}
