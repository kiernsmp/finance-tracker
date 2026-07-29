package com.kiernan.finance_tracker_api.mappers;

import com.kiernan.finance_tracker_api.dto.*;
import com.kiernan.finance_tracker_api.entity.*;
import java.util.List;
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

        return new TransactionEntity(
            dto.getDate(),
            dto.getAmount(),
            dto.getDescription(),
            dto.getNotes()
        );
    }


    
    public List<TransactionResponse> toResponseDto(List<TransactionEntity> entities) {
        return entities.stream()
            .map(entity -> this.toResponseDto(entity))
            .collect(Collectors.toList());
    } 

    public TransactionResponse toResponseDto(TransactionEntity entity) {
        if (entity == null) {
            return null;
        }

        return new TransactionResponse(
            entity.getId(),
            entity.getDate(),
            entity.getAmount(),
            entity.getDescription(),
            entity.getNotes(),
            entity.getCategory(),
            entity.isApproved(),
            entity.isLocked()
        );

    }
}
