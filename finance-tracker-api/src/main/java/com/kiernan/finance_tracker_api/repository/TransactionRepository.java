package com.kiernan.finance_tracker_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kiernan.finance_tracker_api.entity.TransactionEntity;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer> {

    
}
