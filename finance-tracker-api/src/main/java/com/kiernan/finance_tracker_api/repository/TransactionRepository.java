package com.kiernan.finance_tracker_api.repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kiernan.finance_tracker_api.entity.TransactionEntity;

import jakarta.transaction.Transactional;

public interface TransactionRepository extends
    JpaRepository<TransactionEntity, Integer>,
    JpaSpecificationExecutor<TransactionEntity> {

    List<TransactionEntity> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<TransactionEntity> findByDateGreaterThanEqual(LocalDate startDate);
    List<TransactionEntity> findByDateLessThanEqual(LocalDate endDate);

    @Modifying
    @Transactional
    @Query("UPDATE TransactionEntity t SET t.approved = true WHERE t.id = :transactionId")
    void updateApproved(@Param("transactionId") Integer transactionId);

    List<TransactionEntity> findByDescriptionAndCategoryIdNotAndLockedAndApproved(String keyword, Integer categoryId, boolean locked, boolean approved);
    List<TransactionEntity> findAllByDescriptionInAndDateBetween(Collection<String> newDescriptions, LocalDate minDate, LocalDate maxDate);

}