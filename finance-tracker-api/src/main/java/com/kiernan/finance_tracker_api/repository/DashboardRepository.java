package com.kiernan.finance_tracker_api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.kiernan.finance_tracker_api.entity.TransactionEntity;
import com.kiernan.finance_tracker_api.projections.MonthlyAmountProjection;
import com.kiernan.finance_tracker_api.projections.MonthlyCategoryProjection;

import jakarta.transaction.Transactional;

public interface DashboardRepository extends JpaRepository<TransactionEntity, Integer> {

    @Query(value = """
            SELECT
                DATE_TRUNC('month', t.date) AS month,
                c.id AS category_id,
                c.name AS category_name,

                SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) AS total_in,
                SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END) AS total_out,

                mcn.note AS note

            FROM transactions t

            JOIN categories c
                ON t.category_id = c.id

            LEFT JOIN monthly_category_notes mcn
                ON mcn.month = DATE_TRUNC('month', t.date)::date
                AND mcn.category_id = c.id

            WHERE c.name != 'Internal'

            GROUP BY
                DATE_TRUNC('month', t.date),
                c.id,
                c.name,
                mcn.note

            ORDER BY
                month DESC,
                CASE
                    WHEN c.name = 'Income' THEN 0
                    ELSE 1
                END,
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

    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO monthly_category_notes (month, category_id, note)
        VALUES (:month, :categoryId, :note)
        ON CONFLICT (month, category_id)
        DO UPDATE SET note = EXCLUDED.note
        """, nativeQuery = true)
    void upsertMonthlyCategoryNote(
        @Param("month") LocalDate month,
        @Param("categoryId") Integer categoryId,
        @Param("note") String note
    );

}
