import type { KeyboardEvent } from "react";

interface DateFilterProps {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    applyFilters: () => void;
}

export default function DateFilter({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    applyFilters
}: DateFilterProps) {
    function handleEnterApply(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            applyFilters();
        }
    }

    return (
        <div>
            <label>
                Start Date:
                <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onBlur={applyFilters}
                    onKeyDown={handleEnterApply}
                />
            </label>

            <label>
                End Date:
                <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onBlur={applyFilters}
                    onKeyDown={handleEnterApply}
                />
            </label>
        </div>
    )






}
