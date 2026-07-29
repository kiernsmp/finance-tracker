package com.kiernan.finance_tracker_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponseDto {

    private Integer id;
    private LocalDate date;
    private BigDecimal amount;
    private String description;
    private String notes;
    private String category;
    private Boolean approved;
    private Boolean locked;

    public TransactionResponseDto(Integer id, LocalDate date, BigDecimal amount, String description, String notes, String category, Boolean approved, Boolean locked) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.notes = notes;
        this.category = category;
        this.approved = approved;
        this.locked = locked;
    }

    public Integer getId() {
        return id;
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

    public Boolean isApproved() {
        return approved;
    }

    public Boolean isLocked() {
        return locked;
    }

}
