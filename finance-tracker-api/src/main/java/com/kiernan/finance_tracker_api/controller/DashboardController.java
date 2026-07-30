package com.kiernan.finance_tracker_api.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.kiernan.finance_tracker_api.dto.MonthlyCategorySummaryResponse;
import com.kiernan.finance_tracker_api.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private static final Logger log = LoggerFactory.getLogger(TransactionController.class);

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summaries")
    public MonthlyCategorySummaryResponse getDashboardSummaries(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Integer categoryId) {
        
        log.info("\n");
        log.info("ENTERING GET DASHBOARDSUMMARIES");
        return dashboardService.getDashboardSummaries(startDate, endDate, categoryId);
    }
}
