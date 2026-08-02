package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BalanceOffsetResponse {
    private Integer id;
    private Integer userId;
    private BigDecimal amount;
    private LocalDate date;
    private String description;
}
