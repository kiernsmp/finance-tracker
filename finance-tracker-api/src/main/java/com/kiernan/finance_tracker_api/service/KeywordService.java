package com.kiernan.finance_tracker_api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.kiernan.finance_tracker_api.repository.*;
import com.kiernan.finance_tracker_api.dto.KeywordRequest;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;

@Service
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final TransactionRepository transactionRepository;

    public KeywordService(KeywordRepository keywordRepository, TransactionRepository transactionRepository) {
        this.keywordRepository = keywordRepository;
        this.transactionRepository = transactionRepository;
    }
    
    public KeywordEntity createKeyword(KeywordRequest request) {
        KeywordEntity entity = new KeywordEntity(request.getKeyword(), request.getCategoryId());
        KeywordEntity response;

        List<KeywordEntity> existing = keywordRepository.findByKeyword(entity.getKeyword());
        if (existing.isEmpty()) {
            response = keywordRepository.save(entity);
        }
        else {
            KeywordEntity existingKeyword = existing.get(0);
            existingKeyword.setCategoryId(entity.getCategoryId());
            response = keywordRepository.save(existingKeyword);
        }
        
        reclassifyCategoryByKeyword();
        return response;
    }
    
    public void reclassifyCategoryByKeyword() {
        List<TransactionEntity> entities = transactionRepository.findAll();
        assignCategories(entities);
        
        transactionRepository.saveAll(entities);
    }

    public void assignCategories(List<TransactionEntity> entities) {
        Map<String, Integer> keywordMap = toKeywordMap(keywordRepository.findAll());

        for (TransactionEntity entity : entities) {
            String description = entity.getDescription();

            if (description == null) {
                continue;
            }

            for (Map.Entry<String, Integer> entry : keywordMap.entrySet()) {
                if (description.toLowerCase().contains(entry.getKey().toLowerCase())) {
                    entity.setCategoryId(entry.getValue());
                    break;
                }
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
}
