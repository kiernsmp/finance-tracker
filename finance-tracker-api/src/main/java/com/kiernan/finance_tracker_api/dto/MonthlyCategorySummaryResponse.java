package com.kiernan.finance_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.Locale.Category;

import com.kiernan.finance_tracker_api.entity.CategoryEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyCategorySummaryResponse {

    private List<MonthSummary> months;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthSummary {
        private YearMonth monthYear;
        private BigDecimal totalIn;
        private BigDecimal totalOut;
        private List<CategorySummary> categories;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategorySummary {
        private Integer categoryId;
        private String categoryName;
        private BigDecimal totalIn;
        private BigDecimal totalOut;
    }
}