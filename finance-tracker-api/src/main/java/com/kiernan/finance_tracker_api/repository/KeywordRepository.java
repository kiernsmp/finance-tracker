package com.kiernan.finance_tracker_api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kiernan.finance_tracker_api.entity.*;

public interface KeywordRepository extends JpaRepository<KeywordEntity, Integer> {

    public List<KeywordEntity>findByKeyword(String keyword);
}

