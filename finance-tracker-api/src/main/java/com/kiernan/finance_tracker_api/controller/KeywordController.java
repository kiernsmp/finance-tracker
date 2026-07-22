package com.kiernan.finance_tracker_api.controller;

import com.kiernan.finance_tracker_api.dto.KeywordRequest;
import com.kiernan.finance_tracker_api.entity.KeywordEntity;
import com.kiernan.finance_tracker_api.service.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/keywords")
public class KeywordController {

    private final KeywordService keywordService;

    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    @PostMapping("/add")
    public KeywordEntity createKeyword (@RequestBody KeywordRequest request) {
        
        return keywordService.createKeyword(request);
    }

    
}
