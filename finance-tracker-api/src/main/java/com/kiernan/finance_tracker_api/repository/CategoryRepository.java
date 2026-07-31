package com.kiernan.finance_tracker_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kiernan.finance_tracker_api.entity.*;


public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>{
    CategoryEntity findByName(String category);

    @Query("SELECT MAX(c.displayOrder) FROM CategoryEntity c WHERE c.displayOrder < 99")
    Optional<Integer> findMaxDisplayOrder();
    List<CategoryEntity> findByDisplayOrderBetween(Integer oldOrder, Integer newOrder);

}
