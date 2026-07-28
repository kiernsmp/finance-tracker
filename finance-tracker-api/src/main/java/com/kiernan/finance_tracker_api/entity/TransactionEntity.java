package com.kiernan.finance_tracker_api.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactions")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;
    private BigDecimal amount;
    private String notes;
    private LocalDate date;
    private Boolean approved;
    private Boolean locked;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
    
    public TransactionEntity(
        LocalDate date,
        BigDecimal amount,
        String description,
        String notes
    ) {
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.notes = notes;
        this.approved = false;
        this.locked = false;
    }
}
