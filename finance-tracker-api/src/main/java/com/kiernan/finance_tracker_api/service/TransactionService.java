package com.kiernan.finance_tracker_api.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

import javax.xml.crypto.dsig.TransformException;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kiernan.finance_tracker_api.dto.TransactionRequestDto;
import com.kiernan.finance_tracker_api.dto.TransactionResponseDto;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import com.kiernan.finance_tracker_api.mappers.TransactionMapper;
import com.kiernan.finance_tracker_api.repository.*;

import java.util.Map;
import org.slf4j.Logger;



import com.kiernan.finance_tracker_api.parsers.*;

@Service
public class TransactionService {

    private final KeywordService keywordService;
    private final TransactionRepository transactionRepository;
    private final CategoryService categoryService;
    private final TransactionMapper mapper;
    private static final Logger log = LoggerFactory.getLogger(TransactionService.class);
    


    public TransactionService(TransactionRepository transactionRepository, TransactionMapper mapper, KeywordService keywordService, CategoryService categoryService) {
        this.transactionRepository = transactionRepository;
        this.keywordService = keywordService;
        this.categoryService = categoryService;
        this.mapper = mapper;
    }


    public List<TransactionResponseDto> getTransactionRecords(LocalDate startDate, LocalDate endDate) {
        List<TransactionEntity> response;

        if (startDate == null && endDate == null) {
            response = transactionRepository.findAll();
        }
        else if (startDate != null && endDate == null) {
            response = transactionRepository.findByDateGreaterThanEqual(startDate);
        }
        else if (startDate == null && endDate != null) {
            response = transactionRepository.findByDateLessThanEqual(endDate);
        }
        else {
            response = transactionRepository.findByDateBetween(startDate, endDate);
        }

        log.info("Making API call to Database");

        Map<Integer, String> categoryMap = categoryService.getCategoryLookup();

        List<TransactionResponseDto> result = mapper.toResponseDto(response, categoryMap);
        log.info("Successfully retrieved {} records from DB", result.size());
        
        return result;
    }

    public void uploadCsv(MultipartFile file) {

        TransactionParser parser = resolveParser(file, "Commbank");
        List<TransactionRequestDto> records = parser.parse(file);

        List<TransactionEntity> entities = mapper.toEntity(records);

        keywordService.assignCategories(entities);

        transactionRepository.saveAll(entities);

    }

    private TransactionParser resolveParser(MultipartFile file, String input) {
        
        if (input.equals("Commbank")) {
            return new CommbankTransactionParser();
        }

        return new CommbankTransactionParser();
    }
    
}
