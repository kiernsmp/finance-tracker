package com.kiernan.finance_tracker_api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kiernan.finance_tracker_api.repository.*;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;

@Service
public class KeywordService {

    private final KeywordRepository keywordRepository;

    public KeywordService(KeywordRepository keywordRepository) {
        this.keywordRepository = keywordRepository;
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
