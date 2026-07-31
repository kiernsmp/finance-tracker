import { useEffect, useState, type KeyboardEvent } from "react";
import type { CategoryOption } from "@/types/CategoryOption";
import type { TransactionFilter } from "@/types/TransactionFilter";
import Select from "react-select";
import {
    createFilterDraft,
    toAppliedFilter,
    type ApprovedSelectValue,
    type TransactionFilterDraft
} from "@/features/transactions/utils/transactionFilterUtils";

interface TransactionFilterProps {
    appliedFilter: TransactionFilter;
    setAppliedFilter: (filter: TransactionFilter) => void;
    categoryList: CategoryOption[];
}

export default function TransactionFilter({
    appliedFilter,
    setAppliedFilter,
    categoryList
}: TransactionFilterProps) {
    const [draftFilter, setDraftFilter] = useState<TransactionFilterDraft>(() => createFilterDraft(appliedFilter));

    useEffect(() => {
        setDraftFilter(createFilterDraft(appliedFilter));
    }, [appliedFilter]);

    function updateDraftFilter(updates: Partial<TransactionFilterDraft>) {
        setDraftFilter((previous) => ({ ...previous, ...updates }));
    }

    function applyFilter(nextDraft?: TransactionFilterDraft) {
        const valueToApply = nextDraft ?? draftFilter;
        setAppliedFilter(toAppliedFilter(valueToApply));
    }

    function applyWithDraftUpdates(updates: Partial<TransactionFilterDraft>) {
        const nextDraft = { ...draftFilter, ...updates };
        setDraftFilter(nextDraft);
        applyFilter(nextDraft);
    }

    function clearFilters() {
        const emptyDraft = createFilterDraft({});
        setDraftFilter(emptyDraft);
        applyFilter(emptyDraft);
    }

    function handleEnterApply(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            applyFilter();
        }
    }

    const categoryOptions = categoryList.map((c) => ({
        value: c.id,
        label: c.label
    }));

    const selected = categoryOptions.find((o) => o.value === draftFilter.categoryId) ?? null;

    return (
        <div>
            <label>Category: </label>
            <Select
                options={categoryOptions}
                value={selected}
                isClearable
                onChange={(option) => {
                    applyWithDraftUpdates({ categoryId: option?.value });
                }}
            />

            <label>
                Approved:
                <select
                    value={draftFilter.approved}
                    onChange={(e) => {
                        const value = e.target.value as ApprovedSelectValue;
                        applyWithDraftUpdates({ approved: value });
                    }}
                >
                    <option value="">All</option>
                    <option value="true">Approved</option>
                    <option value="false">Not Approved</option>
                </select>
            </label>

            <label>
                Keyword:
                <input
                    type="text"
                    value={draftFilter.keyword}
                    onChange={(e) => updateDraftFilter({ keyword: e.target.value })}
                    onBlur={() => applyFilter()}
                    onKeyDown={handleEnterApply}
                />
            </label>
            
            <label>
                Start Date:
                <input
                    type="date"
                    value={draftFilter.startDate}
                    onChange={(e) => updateDraftFilter({ startDate: e.target.value })}
                    onBlur={() => applyFilter()}
                    onKeyDown={handleEnterApply}
                />
            </label>

            <label>
                End Date:
                <input
                    type="date"
                    value={draftFilter.endDate}
                    onChange={(e) => updateDraftFilter({ endDate: e.target.value })}
                    onBlur={() => applyFilter()}
                    onKeyDown={handleEnterApply}
                />
            </label>

            <button type="button" onClick={clearFilters}>
                Clear Filters
            </button>

        </div>
    );

}
