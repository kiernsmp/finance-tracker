import { useState } from "react";
import type { TransactionFilter } from "../../types/TransactionFilter";

export function useTransactionFilters() {
    const [appliedFilter, setAppliedFilter] = useState<TransactionFilter>({});

    return {
        appliedFilter,
        setAppliedFilter
    };
}
