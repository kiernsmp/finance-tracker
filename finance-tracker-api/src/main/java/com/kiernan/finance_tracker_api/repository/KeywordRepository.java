package com.kiernan.finance_tracker_api.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kiernan.finance_tracker_api.entity.*;

public interface KeywordRepository extends JpaRepository<KeywordEntity, Integer> {

    public Optional<KeywordEntity>findByKeyword(String keyword);

    public List<KeywordEntity>findAllByKeywordIn(Set<String> keyword);
}

