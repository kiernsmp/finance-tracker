import { useState, type KeyboardEvent } from "react";
import type { CategoryOption } from "@/types/CategoryOption";
import type { TransactionFilter } from "@/types/TransactionFilter";
import Select from "react-select";

interface DateFilterProps {
    appliedFilter: TransactionFilter;
    setAppliedFilter: (filter: TransactionFilter) => void;
    categoryList: CategoryOption[];
}

export default function DateFilter({
    appliedFilter,
    setAppliedFilter,
    categoryList
}: DateFilterProps) {
    const [startDate, setStartDate] = useState(appliedFilter.startDate ?? "");
    const [endDate, setEndDate] = useState(appliedFilter.endDate ?? "");
    const [categoryId, setCategoryId] = useState<number | undefined>(appliedFilter.categoryId);

    function commitFilter(nextCategoryId = categoryId) {
        setAppliedFilter({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            categoryId: nextCategoryId
        });
    }

    function handleEnterApply(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            commitFilter();
        }
    }

    const categoryOptions = categoryList.map((c) => ({
        value: c.id,
        label: c.category
    }));

    const selected = categoryOptions.find((o) => o.value === categoryId) ?? null;

    return (
        <div>
            <label>Category: </label>
            <Select
                options={categoryOptions}
                value={selected}
                isClearable
                onChange={(option) => {
                    const nextCategoryId = option ? option.value : undefined;
                    setCategoryId(nextCategoryId);
                    commitFilter(nextCategoryId);
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
