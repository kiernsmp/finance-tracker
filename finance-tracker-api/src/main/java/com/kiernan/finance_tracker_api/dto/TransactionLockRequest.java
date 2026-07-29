package com.kiernan.finance_tracker_api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TransactionLockRequest {
    private boolean locked;
    
}
