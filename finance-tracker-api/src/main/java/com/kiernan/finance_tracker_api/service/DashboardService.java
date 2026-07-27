package com.kiernan.finance_tracker_api.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kiernan.finance_tracker_api.dto.*;
import com.kiernan.finance_tracker_api.entity.*;
import com.kiernan.finance_tracker_api.mappers.DashboardMapper;
import com.kiernan.finance_tracker_api.projections.MonthlyCategoryProjection;
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
        List<MonthlyCategoryProjection> dashboard = dashboardRepository.getMonthlyCategorySummary();
        MonthlyCategorySummaryResponse summaryResponse = dashboardMapper.toMonthlyCategoryResponse(dashboard);
        
        
        return summaryResponse;
    }
}