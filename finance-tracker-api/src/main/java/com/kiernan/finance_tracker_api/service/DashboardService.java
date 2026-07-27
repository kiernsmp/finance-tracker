package com.kiernan.finance_tracker_api.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import com.kiernan.finance_tracker_api.dto.*;

import com.kiernan.finance_tracker_api.mappers.DashboardMapper;
import com.kiernan.finance_tracker_api.projections.*;
import com.kiernan.finance_tracker_api.repository.*;


@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;
    private final DashboardMapper dashboardMapper;
    
    public DashboardService(DashboardRepository dashboardRepository, DashboardMapper dashboardMapper) {
        this.dashboardRepository = dashboardRepository;
        this.dashboardMapper = dashboardMapper;
    }

    public MonthlyCategorySummaryResponse getDashboardSummaries(LocalDate startDate, LocalDate endDate, Integer categoryId) {
        List<MonthlyCategoryProjection> categoryAmounts = dashboardRepository.getMonthlyCategorySummary();
        List<MonthlyAmountProjection> monthlyAmounts = dashboardRepository.getMonthlyAmountSummary();

        MonthlyCategorySummaryResponse summaryResponse = dashboardMapper.toMonthlyCategoryResponse(categoryAmounts, monthlyAmounts);
        
        
        return summaryResponse;
    }
}