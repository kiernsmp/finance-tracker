package com.kiernan.finance_tracker_api.service;

import java.time.LocalDate;
import java.util.List;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.kiernan.finance_tracker_api.dto.TransactionRequestDto;
import com.kiernan.finance_tracker_api.dto.TransactionResponseDto;
import com.kiernan.finance_tracker_api.entity.CategoryEntity;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import com.kiernan.finance_tracker_api.mappers.TransactionMapper;
import com.kiernan.finance_tracker_api.repository.*;

import jakarta.transaction.Transactional;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


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

    
    @Transactional
    public void updateTransactionApproved(Integer id, boolean approved) {
        TransactionEntity transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setApproved(approved);
    }

    @Transactional
    public void updateLock(Integer id, boolean locked) {
        TransactionEntity transaction = transactionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setLocked(locked);
    }

    public void patchAllTransactionsApproved() {
        List<TransactionEntity> entities = transactionRepository.findAll();
        for (TransactionEntity entity : entities) {
            entity.setApproved(true);
        }

        transactionRepository.saveAll(entities);

    }
    
    public void patchAllTransactionsDisapproved() {
        List<TransactionEntity> entities = transactionRepository.findAll();
        for (TransactionEntity entity : entities) {
            entity.setApproved(false);
        }

        transactionRepository.saveAll(entities);

    }

    public List<TransactionResponseDto> getTransactionRecords(LocalDate startDate, LocalDate endDate, Integer categoryId) {
        Specification<TransactionEntity> spec = (root, query, cb) -> cb.conjunction();

        if (startDate != null) {
            spec = spec.and((root, query, cb) ->
                cb.greaterThanOrEqualTo(root.get("date"), startDate));
        }
        if (endDate != null) {
            spec = spec.and((root, query, cb) ->
            cb.lessThanOrEqualTo(root.get("date"), endDate));
        }
        if (categoryId != null) {
            spec = spec.and((root, query, cb) ->
            cb.equal(root.get("category").get("id"), categoryId));
        }

        List<TransactionEntity> response = transactionRepository.findAll(spec);

        response.sort(
            Comparator.comparing(
                TransactionEntity::getDate,
                Comparator.nullsLast(Comparator.naturalOrder())
            ).reversed()
            .thenComparing(
                TransactionEntity::getId,
                Comparator.nullsLast(Comparator.naturalOrder())
            )
        );

        log.info("Making API call to get category lookup table");
        Map<Integer, String> categoryMap = categoryService.getCategoryLookup();

        List<TransactionResponseDto> result = mapper.toResponseDto(response, categoryMap);
        log.info("Successfully retrieved {} records from DB", result.size());

        return result;
    }

    public void uploadCsv(MultipartFile file) {
        TransactionParser parser = resolveParser(file, "Commbank");
        List<TransactionRequestDto> records = parser.parse(file);
        List<TransactionEntity> entities = mapper.toEntity(records);

        assignAllCategories(entities);
        transactionRepository.saveAll(entities);

    }

    public void assignAllCategories(List<TransactionEntity> transactions) {
        Map<Integer, CategoryEntity> categoryMap = categoryService.getCategoryMap();
        CategoryEntity defaultCategory = categoryService.getDefaultEntity();

        Set<String> descriptions = transactions.stream()
                .map(TransactionEntity::getDescription)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Map<String, Integer> keywordMap = keywordService.getKeywordMapForDescriptions(descriptions);

        for (TransactionEntity transaction : transactions) {
            String key = transaction.getDescription();

            if (keywordMap.containsKey(key)) {
                Integer categoryId = keywordMap.get(key);
                transaction.setCategory(categoryMap.get(categoryId));
            }
            else {
                transaction.setCategory(defaultCategory);
            }
        }
    }

    private TransactionParser resolveParser(MultipartFile file, String input) {
        if (input.equals("Commbank")) {
            return new CommbankTransactionParser();
        }

        return new CommbankTransactionParser();
    }
    
}
