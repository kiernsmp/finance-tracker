package com.kiernan.finance_tracker_api.mappers;

import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.kiernan.finance_tracker_api.dto.MonthlyCategorySummaryResponse;
import com.kiernan.finance_tracker_api.projections.MonthlyCategoryProjection;

@Component
public class DashboardMapper {

    public MonthlyCategorySummaryResponse toMonthlyCategoryResponse(
            List<MonthlyCategoryProjection> projections) {

        List<MonthlyCategorySummaryResponse.MonthSummary> months =
            projections.stream()
                .collect(Collectors.groupingBy(
                    projection -> YearMonth.from(projection.getMonth()),
                    LinkedHashMap::new,
                    Collectors.toList()
                ))
                .entrySet()
                .stream()
                .map(entry -> new MonthlyCategorySummaryResponse.MonthSummary(
                    entry.getKey(),
                    entry.getValue().stream()
                        .map(this::toCategory)
                        .toList()
                ))
                .toList();

        return new MonthlyCategorySummaryResponse(months);
    }

    private MonthlyCategorySummaryResponse.CategorySummary toCategory(
            MonthlyCategoryProjection projection) {

        return new MonthlyCategorySummaryResponse.CategorySummary(
            projection.getCategoryName(),
            projection.getTotalIn(),
            projection.getTotalOut()
        );
    }
}