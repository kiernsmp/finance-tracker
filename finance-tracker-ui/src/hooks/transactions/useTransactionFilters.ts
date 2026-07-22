import { useMemo, useState } from "react";
import type { TransactionFilter } from "../../types/TransactionFilter";

export function useTransactionFilters() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [appliedStartDate, setAppliedStartDate] = useState("");
    const [appliedEndDate, setAppliedEndDate] = useState("");
    const [appliedCategoryId, setAppliedCategoryId] = useState<number | undefined>(undefined);

    function applyFilters(nextCategoryId?: number): void {
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);
        setAppliedCategoryId(nextCategoryId ?? categoryId);
    }

    const appliedFilter = useMemo<TransactionFilter>(() => ({
        startDate: appliedStartDate || undefined,
        endDate: appliedEndDate || undefined,
        categoryId: appliedCategoryId
    }), [appliedStartDate, appliedEndDate, appliedCategoryId]);

    return {
        startDate,
        endDate,
        categoryId,
        setStartDate,
        setEndDate,
        setCategoryId,
        applyFilters,
        appliedFilter
    };
}
