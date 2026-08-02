import { type KeyboardEvent } from "react";
import type { CategoryOption } from "@/types/CategoryOption";
import Select from "react-select";
import { type TransactionFilterDraft } from "@/features/transactions/utils/transactionFilterUtils";

interface TransactionFilterProps {
    draftFilter: TransactionFilterDraft;
    updateDraftFilter: (updates: Partial<TransactionFilterDraft>) => void;
    applyFilter: (nextDraft?: TransactionFilterDraft) => void;
    applyWithDraftUpdates: (updates: Partial<TransactionFilterDraft>) => void;
    clearFilters: () => void;
    categoryList: CategoryOption[];
}

export default function TransactionFilter({
    draftFilter,
    updateDraftFilter,
    applyFilter,
    applyWithDraftUpdates,
    clearFilters,
    categoryList
}: TransactionFilterProps) {
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
        <div className="filter-panel">
            <div className="filter-grid">
                <label className="filter-field">
                    <span>Category</span>
                    <Select
                        className="transaction-filter-select"
                        classNamePrefix="transaction-select"
                        options={categoryOptions}
                        value={selected}
                        isClearable
                        onChange={(option) => {
                            applyWithDraftUpdates({ categoryId: option?.value });
                        }}
                    />
                </label>


                <label className="filter-field">
                    <span>Keyword</span>
                    <input
                        type="text"
                        value={draftFilter.keyword}
                        onChange={(e) => updateDraftFilter({ keyword: e.target.value })}
                        onBlur={() => applyFilter()}
                        onKeyDown={handleEnterApply}
                    />
                </label>
                
                <label className="filter-field">
                    <span>Start Date</span>
                    <input
                        type="date"
                        value={draftFilter.startDate}
                        onChange={(e) => updateDraftFilter({ startDate: e.target.value })}
                        onBlur={() => applyFilter()}
                        onKeyDown={handleEnterApply}
                    />
                </label>

                <label className="filter-field">
                    <span>End Date</span>
                    <input
                        type="date"
                        value={draftFilter.endDate}
                        onChange={(e) => updateDraftFilter({ endDate: e.target.value })}
                        onBlur={() => applyFilter()}
                        onKeyDown={handleEnterApply}
                    />
                </label>

            </div>

            <div className="filter-flags">
                <label className="filter-flag">
                    <input
                        type="checkbox"
                        checked={draftFilter.includeHidden}
                        onChange={(e) => {
                            applyWithDraftUpdates({ includeHidden: e.target.checked });
                        }}
                    />
                    <span>Include Internal</span>
                </label>

                <label className="filter-flag">
                    <input
                        type="checkbox"
                        checked={draftFilter.groupTransactions}
                        onChange={(e) => {
                            applyWithDraftUpdates({ groupTransactions: e.target.checked });
                        }}
                    />
                    <span>Group Transactions</span>
                </label>

                <label className="filter-flag">
                    <span>New Transactions Only</span>
                    <input
                        type="checkbox"
                        checked={draftFilter.approved === false}
                        onChange={(e) => {
                            applyWithDraftUpdates({ approved: e.target.checked ? false : null });
                        }}
                    />
                </label>
            </div>

            <button className="ghost-button clear-filters-button" type="button" onClick={clearFilters}>
                Clear Filters
            </button>
        </div>
    );

}
