package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class CommbankCsvDto {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private LocalDate date;
    private BigDecimal transaction;
    private String name;
    private String category;
    private String notes;

    public CommbankCsvDto(String date, String transaction, String name) {
        this.date = LocalDate.parse(date, DATE_FORMATTER);
        this.transaction = new BigDecimal(transaction);
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public BigDecimal getTransaction() {
        return transaction;
    }

    public String getName() {
        return name;
    }
}
