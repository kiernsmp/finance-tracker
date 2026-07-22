package com.kiernan.finance_tracker_api.controller;

import com.kiernan.finance_tracker_api.dto.KeywordRequest;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.service.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.slf4j.Logger;



@RestController
@RequestMapping("/keywords")
public class KeywordController {

    private final KeywordService keywordService;
    private static final Logger log = LoggerFactory.getLogger(KeywordController.class);

    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    @PostMapping("/add")
    public KeywordEntity createKeyword (@RequestBody KeywordRequest request) {
        log.info("UPDATING KEYWORD RECORD\n");
        log.info("Updating keyword with following mapping: keyword: {}, category_id: {}", request.getKeyword(), request.getCategoryId());
        
        return keywordService.createKeyword(request);
    }

    
}
