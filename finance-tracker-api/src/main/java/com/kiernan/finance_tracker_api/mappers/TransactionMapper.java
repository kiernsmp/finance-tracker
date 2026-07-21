package com.kiernan.finance_tracker_api.mappers;

import com.kiernan.finance_tracker_api.dto.*;
import com.kiernan.finance_tracker_api.entity.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {
    
    public List<TransactionEntity> toEntity(List<TransactionRequestDto> dtos) {
        return dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
    
    public TransactionEntity toEntity(TransactionRequestDto dto) {
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

    public List<TransactionResponseDto> toResponseDto(List<TransactionEntity> entities, Map<Integer,String> categoryMap) {
        return entities.stream()
            .map(entity -> this.toResponseDto(entity, categoryMap))
            .collect(Collectors.toList());
    } 


    public TransactionResponseDto toResponseDto(TransactionEntity entity, Map<Integer,String> categoryMap) {
        if (entity == null) {
            return null;
        }

        return new TransactionResponseDto(
            entity.getId(),
            entity.getDate(),
            entity.getAmount(),
            entity.getDescription(),
            entity.getNotes(),
            (entity.getCategoryId() == null) ? "?" : categoryMap.getOrDefault(entity.getCategoryId(), "?")
        );

    }
}
