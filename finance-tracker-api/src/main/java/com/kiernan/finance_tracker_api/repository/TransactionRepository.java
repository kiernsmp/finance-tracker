package com.kiernan.finance_tracker_api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.kiernan.finance_tracker_api.entity.TransactionEntity;

public interface TransactionRepository extends
    JpaRepository<TransactionEntity, Integer>,
    JpaSpecificationExecutor<TransactionEntity> {

    List<TransactionEntity> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<TransactionEntity> findByDateGreaterThanEqual(LocalDate startDate);
    List<TransactionEntity> findByDateLessThanEqual(LocalDate endDate);

}