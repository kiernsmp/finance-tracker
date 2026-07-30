package com.kiernan.finance_tracker_api.mappers;

import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.kiernan.finance_tracker_api.dto.MonthlyCategorySummaryResponse;
import com.kiernan.finance_tracker_api.projections.MonthlyAmountProjection;
import com.kiernan.finance_tracker_api.projections.MonthlyCategoryProjection;

@Component
public class DashboardMapper {

    public MonthlyCategorySummaryResponse toMonthlyCategoryResponse(
            List<MonthlyCategoryProjection> categoryProjection,
            List<MonthlyAmountProjection> amountsProjection) {

        Map<YearMonth, MonthlyAmountProjection> amountMap = amountsProjection.stream()
                .collect(Collectors.toMap(
                        projection -> YearMonth.from(projection.getMonth()),
                        projection -> projection));

        List<MonthlyCategorySummaryResponse.MonthSummary> months = categoryProjection.stream()
                .collect(Collectors.groupingBy(
                        projection -> YearMonth.from(projection.getMonth()),
                        LinkedHashMap::new,
                        Collectors.toList()))
                .entrySet()
                .stream()
                .map(entry -> {
                    MonthlyAmountProjection amount = amountMap.get(entry.getKey());

                    return new MonthlyCategorySummaryResponse.MonthSummary(
                            entry.getKey(),
                            amount.getTotalIn(),
                            amount.getTotalOut(),
                            entry.getValue().stream()
                                    .map(this::toCategory)
                                    .toList());
                })
                .toList();

        return new MonthlyCategorySummaryResponse(months);
    }

    private MonthlyCategorySummaryResponse.CategorySummary toCategory(
            MonthlyCategoryProjection projection) {

        return new MonthlyCategorySummaryResponse.CategorySummary(
                projection.getCategoryName(),
                projection.getTotalIn(),
                projection.getTotalOut());
    }
}