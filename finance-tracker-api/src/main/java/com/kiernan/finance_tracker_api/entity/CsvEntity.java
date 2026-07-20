package com.kiernan.finance_tracker_api.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "transactions")
public class CsvEntity {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private BigDecimal transaction;
    private String category;
    private LocalDate date;
    private String notes;

}
