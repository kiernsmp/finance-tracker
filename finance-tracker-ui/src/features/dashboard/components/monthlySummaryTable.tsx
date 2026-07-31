import type { MonthlySummary } from "@/types/MonthlySummary";
import MonthSummarySection from "./MonthSummarySection";

interface MonthlySummaryProps {
    monthlySummary: MonthlySummary
}

export default function MonthlySummaryTable({
    monthlySummary
}: MonthlySummaryProps) {
    return (
        <div className="dashboard-month-list">
            {monthlySummary.months.map((month) => (
                <div className="dashboard-month-card" key={month.monthYear}>
                    <MonthSummarySection month={month} />
                </div>
            ))}
        </div>
    );
}