import type { MonthlySummary } from "@/types/MonthlySummary";
import MonthSummarySection from "./MonthSummarySection";

interface MonthlySummaryProps {
    monthlySummary: MonthlySummary
}

export default function MonthlySummaryTable({
    monthlySummary
}: MonthlySummaryProps) {
    return (
        <div>
            {monthlySummary.months.map((month) => (
                <MonthSummarySection
                    key={month.monthYear}
                    month={month}
                />
            ))}
        </div>
    );
}