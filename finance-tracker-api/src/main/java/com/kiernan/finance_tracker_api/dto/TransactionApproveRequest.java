package com.kiernan.finance_tracker_api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TransactionApproveRequest {
    private boolean approved;
    
}
