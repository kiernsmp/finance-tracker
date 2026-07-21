package com.kiernan.finance_tracker_api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.kiernan.finance_tracker_api.dto.TransactionResponseDto;
import com.kiernan.finance_tracker_api.service.*;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;
    private static final Logger log = LoggerFactory.getLogger(TransactionController.class);

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/upload")
    public String uploadCsv(@RequestParam("file") MultipartFile file) {
        System.out.println("Uploading file: " + file.getOriginalFilename());

        transactionService.uploadCsv(file);
        
        return "CSV uploaded";
    }

    @GetMapping("/records")
    public List<TransactionResponseDto> getTransactionRecords(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        log.info("ENTERING GET TRANSACTION RECORDS\n");
        log.info("Fetching transaction records with startDate={}, endDate={}", startDate, endDate);
        List<TransactionResponseDto> response = transactionService.getTransactionRecords(startDate, endDate);

        return response;
    }
    

}
