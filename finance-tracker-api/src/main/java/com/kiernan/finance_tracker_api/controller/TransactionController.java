package com.kiernan.finance_tracker_api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kiernan.finance_tracker_api.dto.TransactionApproveRequest;
import com.kiernan.finance_tracker_api.dto.TransactionCategoryRequest;
import com.kiernan.finance_tracker_api.dto.TransactionFilterRequest;
import com.kiernan.finance_tracker_api.dto.TransactionLockRequest;
import com.kiernan.finance_tracker_api.dto.TransactionResponse;
import com.kiernan.finance_tracker_api.dto.TransactionUploadResponse;
import com.kiernan.finance_tracker_api.service.*;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private static final Logger log = LoggerFactory.getLogger(TransactionController.class);
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/upload")
    public TransactionUploadResponse uploadCsv(@RequestParam("file") MultipartFile file) {
        System.out.println("Uploading file: " + file.getOriginalFilename());

        TransactionUploadResponse response = transactionService.uploadCsv(file);
        log.info(
            "Transaction upload summary - Found: {}, Duplicates: {}, New: {}, Saved: {}",
            response.getTransactionsFound(),
            response.getDuplicatesFound(),
            response.getNewTransactions(),
            response.getTransactionsSaved()
        );
        
        return response;
    }

    @GetMapping("/records")
    public List<TransactionResponse> getTransactionRecords(
            @ModelAttribute TransactionFilterRequest request
    ) {
        log.info("\n");
        log.info("GET /records receieved");
        List<TransactionResponse> response = transactionService.getTransactionRecords(request);

        return response;
    }

    @PatchMapping("/approve-all")
    public ResponseEntity<Void> patchAllTransactionsApproved() {
        log.info("\n");
        log.info("PATCH /transactions/approve-all request received");
        transactionService.patchAllTransactionsApproved();

        return ResponseEntity.noContent().build();

    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Void> patchTransactionApproved(
        @PathVariable Integer id,
        @RequestBody TransactionApproveRequest request) {
        log.info("\n");
        log.info("PATCH /transactions/approve request received for transaction {}, with approved={}", id, request.isApproved());
        transactionService.updateTransactionApproved(id, request.isApproved());

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/disapprove-all")
    public ResponseEntity<Void> patchAllTransactionsDisapproved() {
        transactionService.patchAllTransactionsDisapproved();
        
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/lock")
    public ResponseEntity<Void> updateLock(
            @PathVariable Integer id,
            @RequestBody TransactionLockRequest request) {

        log.info("\n");
        log.info("PATCH lock received for transactionId={}, setting locked={}", id, request.isLocked());
        transactionService.updateLock(id, request.isLocked());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/update-category")
    public ResponseEntity<Void> updateTransactionCategory(
            @PathVariable Integer id,
            @RequestBody TransactionCategoryRequest request) {

        log.info("\n");
        log.info("PATCH /update-category received for transaction: {} to categoryId: {}", id, request.getCategoryId());
        transactionService.updateTransactionCategory(id, request.getCategoryId());
        
        return ResponseEntity.noContent().build();
    }
    

}
