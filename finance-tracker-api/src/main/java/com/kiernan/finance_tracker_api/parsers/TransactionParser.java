package com.kiernan.finance_tracker_api.parsers;

import com.kiernan.finance_tracker_api.dto.*;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface TransactionParser {
    List<TransactionDto> parse(MultipartFile file);
    
}
