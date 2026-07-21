package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponseDto {

    private Integer transactionId;
    private LocalDate date;
    private BigDecimal amount;
    private String description;
    private String notes;
    private String category;

    public TransactionResponseDto(Integer transactionId, LocalDate date, BigDecimal amount, String description, String notes, String category) {
        this.transactionId = transactionId;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.notes = notes;
        this.category = category;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public LocalDate getDate() {
        return date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public String getNotes() {
        return notes;
    }

    public String getCategory() {
        return category;
    }

}
