package com.kiernan.finance_tracker_api.mappers;

import com.kiernan.finance_tracker_api.dto.*;
import com.kiernan.finance_tracker_api.entity.*;
import java.util.List;
import java.util.stream.Collectors;

public class TransactionMapper {
    
    public List<TransactionEntity> toEntity(List<TransactionDto> dtos) {
        return dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
    
    public TransactionEntity toEntity(TransactionDto dto) {
        if (dto == null) {
            return null;
        }

        TransactionEntity entity = new TransactionEntity();
        entity.setDate(dto.getDate());
        entity.setAmount(dto.getAmount());
        entity.setDescription(dto.getDescription());
        entity.setNotes(dto.getNotes());
        entity.setCategoryId(0);
        return entity;
    }
}
