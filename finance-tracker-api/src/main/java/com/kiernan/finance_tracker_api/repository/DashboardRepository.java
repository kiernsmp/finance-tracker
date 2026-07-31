package com.kiernan.finance_tracker_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import com.kiernan.finance_tracker_api.projections.MonthlyAmountProjection;
import com.kiernan.finance_tracker_api.projections.MonthlyCategoryProjection;

public interface DashboardRepository extends JpaRepository<TransactionEntity, Integer> {

    @Query(value = """
        SELECT
            DATE_TRUNC('month', t.date) AS month,
            c.id AS category_id,
            c.name AS category_name,
            SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) AS total_in,
            SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END) AS total_out
        FROM transactions t
        JOIN categories c
            ON t.category_id = c.id
        WHERE c.name != 'Internal'
        GROUP BY
            DATE_TRUNC('month', t.date),
            c.name,
            c.id
        ORDER BY
            month DESC,
            GREATEST(
                SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END),
                SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END)
            ) DESC
        """, nativeQuery = true)
    List<MonthlyCategoryProjection> getMonthlyCategorySummary();

    @Query(value = """
        SELECT
            DATE_TRUNC('month', t.date) AS month,
            SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) AS total_in,
            SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END) AS total_out
        FROM transactions t
        JOIN categories c
            ON t.category_id = c.id
        WHERE c.name != 'Internal'
        GROUP BY
            DATE_TRUNC('month', t.date)
        ORDER BY
            month DESC;
            """, nativeQuery = true)
    List<MonthlyAmountProjection> getMonthlyAmountSummary();

}
