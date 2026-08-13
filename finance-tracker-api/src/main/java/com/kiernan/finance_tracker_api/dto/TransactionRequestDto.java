package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.Getter;

@Getter
public class TransactionRequestDto {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private LocalDate date;
    private BigDecimal amount;
    private String description;
    private String metaNotes;

    public TransactionRequestDto(String date, String transaction, String description, String metaNotes) {
        this.date = LocalDate.parse(date, DATE_FORMATTER);
        this.amount = new BigDecimal(transaction.replace(",", ""));
        this.description = description;
        this.metaNotes = metaNotes;
    }

}
