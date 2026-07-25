import type { KeyboardEvent } from "react";
import type { CategoryOption } from "../../types/CategoryOption";
import Select from "react-select";

interface DateFilterProps {
    startDate: string;
    endDate: string;
    categoryId: number | undefined;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setCategoryId: (id: number | undefined) => void;
    categoryList: CategoryOption[];
    applyFilters: (nextCategoryId?: number) => void;
}

export default function DateFilter({
    startDate,
    endDate,
    categoryId,
    setStartDate,
    setEndDate,
    setCategoryId,
    categoryList,
    applyFilters
}: DateFilterProps) {
    function handleEnterApply(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            applyFilters();
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
                        applyFilters(nextCategoryId);
                    }}
                />
            
            <label>
                Start Date:
                <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onBlur={() => applyFilters()}
                    onKeyDown={handleEnterApply}
                />
            </label>

            <label>
                End Date:
                <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onBlur={() => applyFilters()}
                    onKeyDown={handleEnterApply}
                />
            </label>
        </div>
    )

}
