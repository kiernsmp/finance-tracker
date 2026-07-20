package com.kiernan.finance_tracker_api.service;

import org.springframework.web.multipart.MultipartFile;
import com.kiernan.finance_tracker_api.repository.*;

public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public void uploadCsv(MultipartFile file) {
        
        

    }
    
}
