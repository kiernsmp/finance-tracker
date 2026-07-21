package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponseDto {

    private Integer transactionId;
    private LocalDate date;
    private BigDecimal amount;
    private String description;
    private String notes;
    private Integer categoryId;

    public TransactionResponseDto(Integer transactionId, LocalDate date, BigDecimal amount, String description, String notes, Integer categoryId) {
        this.transactionId = transactionId;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.notes = notes;
        this.categoryId = categoryId;
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

    public Integer getCategoryId() {
        return categoryId;
    }

}
