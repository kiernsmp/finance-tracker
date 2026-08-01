package com.kiernan.finance_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionUploadResponse {
    private int transactionsFound;
    private int duplicatesFound;
    private int newTransactions;
    private int transactionsSaved;
}
