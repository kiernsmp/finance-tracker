import { useState, type KeyboardEvent } from "react";
import type { CategoryOption } from "@/types/CategoryOption";
import type { TransactionFilter } from "@/types/TransactionFilter";
import Select from "react-select";

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
    const [startDate, setStartDate] = useState(appliedFilter.startDate ?? "");
    const [endDate, setEndDate] = useState(appliedFilter.endDate ?? "");

    function commitFilter(nextCategoryId?: number) {
        setAppliedFilter({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            ...(nextCategoryId !== undefined ? { categoryId: nextCategoryId } : {})
        });
    }

    function handleEnterApply(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            commitFilter();
        }
    }

    const categoryOptions = categoryList.map((c) => ({
        value: c.id,
        label: c.label
    }));

    const selected = categoryOptions.find((o) => o.value === appliedFilter.categoryId) ?? null;

    return (
        <div>
            <label>Category: </label>
            <Select
                options={categoryOptions}
                value={selected}
                isClearable
                onChange={(option) => {
                    commitFilter(option?.value);
                }}
            />

            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onBlur={() => commitFilter()}
                    onKeyDown={handleEnterApply}
                />
            </label>

            <label>
                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onBlur={() => commitFilter()}
                    onKeyDown={handleEnterApply}
                />
            </label>
        </div>
    );

}
