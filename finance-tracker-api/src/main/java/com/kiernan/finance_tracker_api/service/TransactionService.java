package com.kiernan.finance_tracker_api.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kiernan.finance_tracker_api.dto.TransactionDto;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import com.kiernan.finance_tracker_api.mappers.TransactionMapper;
import com.kiernan.finance_tracker_api.repository.*;
import com.kiernan.finance_tracker_api.parsers.*;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public void uploadCsv(MultipartFile file) {

        TransactionParser parser = resolveParser(file, "Commbank");
        List<TransactionDto> records = parser.parse(file);
®
        TransactionMapper mapper = new TransactionMapper();
        List<TransactionEntity> entities = mapper.toEntity(records);

        transactionRepository.saveAll(entities);


    }

    private TransactionParser resolveParser(MultipartFile file, String input) {
        
        if (input.equals("Commbank")) {
            return new CommbankTransactionParser();
        }

        return new CommbankTransactionParser();
    }
    
}
