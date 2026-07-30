package com.kiernan.finance_tracker_api.projections;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface MonthlyAmountProjection {
    LocalDateTime getMonth();

    BigDecimal getTotalIn();

    BigDecimal getTotalOut();
}
