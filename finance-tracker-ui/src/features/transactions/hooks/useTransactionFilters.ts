import { useState } from "react";
import type { TransactionFilter } from "@/types/TransactionFilter";
import {
    createFilterDraft,
    toAppliedFilter,
    type TransactionFilterDraft
} from "@/features/transactions/utils/transactionFilterUtils";

export function useTransactionFilters(initialFilter: TransactionFilter = {
    includeHidden: false,
    groupTransactions: false,
}) {
    const [appliedFilter, setAppliedFilter] = useState<TransactionFilter>(initialFilter);
    const [draftFilter, setDraftFilter] = useState<TransactionFilterDraft>(() => createFilterDraft(initialFilter));

    function updateDraftFilter(updates: Partial<TransactionFilterDraft>) {
        setDraftFilter((previous) => ({ ...previous, ...updates }));
    }

    function applyFilter(nextDraft?: TransactionFilterDraft) {
        const draftToApply = nextDraft ?? draftFilter;
        setAppliedFilter(toAppliedFilter(draftToApply));
    }

    function applyWithDraftUpdates(updates: Partial<TransactionFilterDraft>) {
        const nextDraft = { ...draftFilter, ...updates };
        setDraftFilter(nextDraft);
        applyFilter(nextDraft);
    }

    function clearFilters() {
        const emptyDraft = createFilterDraft({
            includeHidden: false,
            groupTransactions: false,
        });
        setDraftFilter(emptyDraft);
        applyFilter(emptyDraft);
    }

    return {
        appliedFilter,
        draftFilter,
        setAppliedFilter,
        updateDraftFilter,
        applyFilter,
        applyWithDraftUpdates,
        clearFilters,
    };
}
