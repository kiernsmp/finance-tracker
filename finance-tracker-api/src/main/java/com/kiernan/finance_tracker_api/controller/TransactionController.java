package com.kiernan.finance_tracker_api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kiernan.finance_tracker_api.service.*;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/upload")
    public String uploadCsv(@RequestParam MultipartFile file) {
        transactionService.uploadCsv(file);
        System.out.println("yoyo");

        return "CSV uploaded";
    }

    
}
