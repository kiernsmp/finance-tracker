package com.kiernan.finance_tracker_api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.kiernan.finance_tracker_api.repository.*;
import com.kiernan.finance_tracker_api.dto.KeywordRequest;
import com.kiernan.finance_tracker_api.entity.CategoryEntity;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

@Service
public class KeywordService {
    
    private final KeywordRepository keywordRepository;
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private static final Logger log = LoggerFactory.getLogger(KeywordService.class);

    public KeywordService(KeywordRepository keywordRepository, TransactionRepository transactionRepository, CategoryRepository categoryRepository) {
        this.keywordRepository = keywordRepository;
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
    }
    
    public KeywordEntity createKeyword(KeywordRequest request) {
        KeywordEntity entity = new KeywordEntity(request.getKeyword(), request.getCategoryId());
        KeywordEntity response;

        log.info("Updatind transactionId {} to True", request.getTransactionId());
        transactionRepository.updateApproved(request.getTransactionId());

        List<KeywordEntity> existing = keywordRepository.findByKeyword(entity.getKeyword());
        if (existing.isEmpty()) {
            log.info("New Keyword is original, saving to database");
            response = keywordRepository.save(entity);
        }
        else {
            log.info("New Keyword is duplicate, with original category_id: {}", existing.get(0).getCategoryId());
            KeywordEntity existingKeyword = existing.get(0);
            existingKeyword.setCategoryId(entity.getCategoryId());
            response = keywordRepository.save(existingKeyword);
            log.info("Updated keyword to new category_id: {}", existingKeyword.getCategoryId());
        }
        
        reclassifyCategoryByKeyword();
        
        return response;
    }
    
    public void reclassifyCategoryByKeyword() {
        List<TransactionEntity> entities = transactionRepository.findAll();
        assignCategories(entities);
        
        transactionRepository.saveAll(entities);
    }

    public void assignCategories(List<TransactionEntity> transactions) {
        Map<String, Integer> keywordMap = toKeywordMap(keywordRepository.findAll());
        Map<Integer, CategoryEntity> categoryMap = toCategoryMap(categoryRepository.findAll());
        CategoryEntity defaultCategory = categoryRepository.findByName(CategoryEntity.DEFAULT_CATEGORY_NAME);

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

    private Map<String, Integer> toKeywordMap(List<KeywordEntity> keywords) {
        Map<String, Integer> keywordMap = new HashMap<>();

        for (KeywordEntity keyword : keywords) {
            if (keyword.getKeyword() == null || keyword.getCategoryId() == null) {
                continue;
            }

            keywordMap.put(keyword.getKeyword(), keyword.getCategoryId());
        }

        return keywordMap;
    }

    private Map<Integer, CategoryEntity> toCategoryMap(List<CategoryEntity> categories) {
        Map<Integer, CategoryEntity> categoryMap = new HashMap<>();
        
        for (CategoryEntity category : categories) {
            categoryMap.put(category.getId(), category);
        }

        return categoryMap;

    }
}
