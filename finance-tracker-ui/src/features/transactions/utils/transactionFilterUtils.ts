import type { TransactionFilter } from "@/types/TransactionFilter";

export type ApprovedSelectValue = "" | "true" | "false";

export interface TransactionFilterDraft {
    startDate: string;
    endDate: string;
    categoryId?: number;
    approved: ApprovedSelectValue;
    keyword: string;
}

export function createFilterDraft(appliedFilter: TransactionFilter): TransactionFilterDraft {
    return {
        startDate: appliedFilter.startDate ?? "",
        endDate: appliedFilter.endDate ?? "",
        categoryId: appliedFilter.categoryId,
        approved: toApprovedSelectValue(appliedFilter.approved),
        keyword: appliedFilter.keyword ?? ""
    };
}

export function toAppliedFilter(draft: TransactionFilterDraft): TransactionFilter {
    const keyword = draft.keyword.trim();

    return {
        startDate: draft.startDate || undefined,
        endDate: draft.endDate || undefined,
        categoryId: draft.categoryId,
        approved: draft.approved === "" ? undefined : draft.approved === "true",
        keyword: keyword || undefined
    };
}

function toApprovedSelectValue(approved: boolean | undefined): ApprovedSelectValue {
    if (approved === undefined) {
        return "";
    }

    return approved ? "true" : "false";
}
