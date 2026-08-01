import type { TransactionFilter } from "@/types/TransactionFilter";

export type ApprovedSelectValue = "" | "true" | "false";

export interface TransactionFilterDraft {
    startDate: string;
    endDate: string;
    categoryId?: number;
    approved: ApprovedSelectValue;
    keyword: string;
    includeHidden: boolean;
}

export function createFilterDraft(appliedFilter: TransactionFilter): TransactionFilterDraft {
    return {
        startDate: appliedFilter.startDate ?? "",
        endDate: appliedFilter.endDate ?? "",
        categoryId: appliedFilter.categoryId,
        approved: toApprovedSelectValue(appliedFilter.approved),
        keyword: appliedFilter.keyword ?? "",
        includeHidden: appliedFilter.includeHidden ?? false,
    };
}

export function toAppliedFilter(draft: TransactionFilterDraft): TransactionFilter {
    const keyword = draft.keyword.trim();

    return {
        startDate: draft.startDate || undefined,
        endDate: draft.endDate || undefined,
        categoryId: draft.categoryId,
        approved: draft.approved === "" ? undefined : draft.approved === "true",
        keyword: keyword || undefined,
        includeHidden: draft.includeHidden ? true : undefined,
    };
}

export function buildInitialFilterFromSearchParams(searchParams: URLSearchParams): TransactionFilter {
    const month = searchParams.get("month");
    const categoryId = searchParams.get("categoryId");
    const nextFilter: TransactionFilter = {};

    if (month) {
        const monthRange = getMonthDateRange(month);
        if (monthRange) {
            nextFilter.startDate = monthRange.startDate;
            nextFilter.endDate = monthRange.endDate;
        }
    }

    if (categoryId) {
        const parsedCategoryId = Number(categoryId);
        if (!Number.isNaN(parsedCategoryId)) {
            nextFilter.categoryId = parsedCategoryId;
        }
    }

    return nextFilter;
}

function toApprovedSelectValue(approved: boolean | undefined): ApprovedSelectValue {
    if (approved === undefined) {
        return "";
    }

    return approved ? "true" : "false";
}

function getMonthDateRange(month: string): { startDate: string; endDate: string } | null {
    const start = new Date(`${month}-01T00:00:00`);
    if (Number.isNaN(start.getTime())) {
        return null;
    }

    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    const endDay = String(end.getDate()).padStart(2, "0");

    return {
        startDate: `${month}-01`,
        endDate: `${month}-${endDay}`,
    };
}
