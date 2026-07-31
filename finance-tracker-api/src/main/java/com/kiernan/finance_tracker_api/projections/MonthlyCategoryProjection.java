package com.kiernan.finance_tracker_api.projections;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface MonthlyCategoryProjection {

    LocalDateTime getMonth();

    Integer getCategoryId();

    String getCategoryName();
    
    BigDecimal getTotalIn();

    BigDecimal getTotalOut();
}