package com.kiernan.finance_tracker_api.repository;

import com.kiernan.finance_tracker_api.entity.BalanceOffsetEntity;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceOffsetRepository extends JpaRepository<BalanceOffsetEntity, Integer> {
    
    List<BalanceOffsetEntity> findAllByUserId(Integer user_id);
}
