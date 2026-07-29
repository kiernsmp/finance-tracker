package com.kiernan.finance_tracker_api.service;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.kiernan.finance_tracker_api.repository.*;

import jakarta.transaction.Transactional;

import com.kiernan.finance_tracker_api.dto.KeywordRequest;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.events.KeywordUpdatedEvent;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

@Service
public class KeywordService {
    
    private final CategoryService categoryService;
    private final KeywordRepository keywordRepository;
    private final ApplicationEventPublisher eventPublisher;
    
    private static final Logger log = LoggerFactory.getLogger(KeywordService.class);

    public KeywordService(KeywordRepository keywordRepository, TransactionRepository transactionRepository, CategoryRepository categoryRepository, CategoryService categoryService, ApplicationEventPublisher eventPublisher) {
        this.keywordRepository = keywordRepository;
        this.eventPublisher = eventPublisher;
        this.categoryService = categoryService;
    }
    
    @Transactional
    public KeywordEntity upsertKeyword(KeywordRequest request) {
        KeywordEntity keywordEntity = keywordRepository.findByKeyword(request.getKeyword())
                .orElseGet(() -> new KeywordEntity(request.getKeyword(), request.getCategoryId()));

        keywordEntity.setCategoryId(request.getCategoryId());
        
        eventPublisher.publishEvent(
            new KeywordUpdatedEvent(keywordEntity.getKeyword(), categoryService.getCategoryById(request.getCategoryId()))
        );

        return keywordRepository.save(keywordEntity);

    }

    public Map<String, Integer> getKeywordMapForDescriptions(Set<String> descriptions) {
        return keywordRepository.findAllByKeywordIn(descriptions).stream()
                .collect(Collectors.toMap(
                    KeywordEntity::getKeyword,
                    KeywordEntity::getCategoryId,
                    (existing, replacement) -> existing
                ));
    }

}
