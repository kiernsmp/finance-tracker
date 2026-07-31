import { useState } from "react";
import type { TransactionFilter } from "@/types/TransactionFilter";

export function useTransactionFilters(initialFilter: TransactionFilter = {}) {
    const [appliedFilter, setAppliedFilter] = useState<TransactionFilter>(initialFilter);

    return {
        appliedFilter,
        setAppliedFilter
    };
}
