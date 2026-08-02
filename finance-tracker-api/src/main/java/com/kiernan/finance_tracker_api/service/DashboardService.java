package com.kiernan.finance_tracker_api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import com.kiernan.finance_tracker_api.dto.*;
import com.kiernan.finance_tracker_api.entity.BalanceOffsetEntity;
import com.kiernan.finance_tracker_api.mappers.DashboardMapper;
import com.kiernan.finance_tracker_api.projections.*;
import com.kiernan.finance_tracker_api.repository.*;


@Service
public class DashboardService {

    private final BalanceOffsetRepository balanceOffsetRepository;
    private final DashboardRepository dashboardRepository;
    private final DashboardMapper dashboardMapper;
    
    public DashboardService(DashboardRepository dashboardRepository, DashboardMapper dashboardMapper, BalanceOffsetRepository balanceOffsetRepository) {
        this.dashboardRepository = dashboardRepository;
        this.dashboardMapper = dashboardMapper;
        this.balanceOffsetRepository = balanceOffsetRepository;
    }

    public BalanceOffsetResponse getBalanceOffset(Integer user_id) {
        List<BalanceOffsetEntity> balanceOffsets =  balanceOffsetRepository.findAllByUserId(user_id);

        BigDecimal totalOffset = balanceOffsets.stream()
            .map(BalanceOffsetEntity::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BalanceOffsetEntity balanceOffset = balanceOffsets.get(0);

        return BalanceOffsetResponse.builder()
                .id(balanceOffset.getId())
                .userId(balanceOffset.getUserId())
                .amount(totalOffset)
                .date(balanceOffset.getDate())
                .description(balanceOffset.getDescription())
                .build();
    }
    
    public MonthlyCategorySummaryResponse getDashboardSummaries(LocalDate startDate, LocalDate endDate, Integer categoryId) {
        List<MonthlyCategoryProjection> categoryAmounts = dashboardRepository.getMonthlyCategorySummary();
        List<MonthlyAmountProjection> monthlyAmounts = dashboardRepository.getMonthlyAmountSummary();

        MonthlyCategorySummaryResponse summaryResponse = dashboardMapper.toMonthlyCategoryResponse(categoryAmounts, monthlyAmounts);
        
        
        return summaryResponse;
    }
}
