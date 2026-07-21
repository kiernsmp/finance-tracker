package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


public class TransactionRequestDto {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private LocalDate date;
    private BigDecimal amount;
    private String description;
    private String notes;

    public TransactionRequestDto(String date, String transaction, String description, String notes) {
        this.date = LocalDate.parse(date, DATE_FORMATTER);
        this.amount = new BigDecimal(transaction);
        this.description = description;
        this.notes = notes;
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
}
