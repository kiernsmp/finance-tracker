package com.kiernan.finance_tracker_api.service;

import java.time.LocalDate;
import java.util.List;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kiernan.finance_tracker_api.dto.TransactionFilterRequest;
import com.kiernan.finance_tracker_api.dto.TransactionRequestDto;
import com.kiernan.finance_tracker_api.dto.TransactionResponse;
import com.kiernan.finance_tracker_api.entity.CategoryEntity;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import com.kiernan.finance_tracker_api.events.KeywordUpdatedEvent;
import com.kiernan.finance_tracker_api.mappers.TransactionMapper;
import com.kiernan.finance_tracker_api.repository.*;

import jakarta.transaction.Transactional;

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

    public List<TransactionResponse> getTransactionRecords(TransactionFilterRequest request) {
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();
        Integer categoryId = request.getCategoryId();
        Boolean approved = request.getApproved();

        log.info("startDate: {}, endDate: {}, categoryId: {}, approved: {}", startDate, endDate, categoryId, approved);
        
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
        if (approved != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("approved"), approved));
        }

        Sort sort = Sort.by(
                Sort.Order.desc("date"),
                Sort.Order.asc("id"));

        List<TransactionEntity> response = transactionRepository.findAll(spec, sort);

        List<TransactionResponse> result = mapper.toResponseDto(response);
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

    @Transactional
    public void updateTransactionCategory(Integer id, Integer categoryId) {
        TransactionEntity entity = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        CategoryEntity category = categoryService.getCategoryById(categoryId);
        
        entity.setCategory(category);
    }

    @EventListener
    public void handleKeywordUpdated(KeywordUpdatedEvent event) {
        recategoriseTransactions(event.getKeyword(), event.getCategory());

    }

    @Transactional
    public void recategoriseTransactions(String keyword, CategoryEntity category) {
        List<TransactionEntity> transactions = transactionRepository.findByDescriptionAndCategoryIdNotAndLocked(keyword, category.getId(), false);

        for (TransactionEntity transaction : transactions) {
            transaction.setCategory(category);
        }
        if (transactions.size() != 0) {
            log.info("Updated {} transactions to {}", transactions.size(), category.getName());
        }
    }
    
}
