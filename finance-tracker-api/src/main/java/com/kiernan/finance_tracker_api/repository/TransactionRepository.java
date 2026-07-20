package com.kiernan.finance_tracker_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kiernan.finance_tracker_api.entity.CsvEntity;

@Repository
public interface TransactionRepository extends JpaRepository<CsvEntity, Integer> {

    
}
