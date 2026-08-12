import type { MonthlySummary } from "@/types/MonthlySummary";
import MonthSummarySection from "./MonthSummarySection";

interface MonthlySummaryProps {
    monthlySummary: MonthlySummary;
    updateDashboardCategoryNotes: (month: string, categoryId: number, note: string) => Promise<void>;
}

export default function MonthlySummaryTable({
    monthlySummary,
    updateDashboardCategoryNotes
}: MonthlySummaryProps) {
    return (
        <div className="dashboard-month-list">
            {monthlySummary.months.map((month) => (
                <div className="dashboard-month-row" key={month.monthYear}>
                    <div className="dashboard-month-card">
                        <MonthSummarySection
                            month={month}
                            updateDashboardCategoryNotes={updateDashboardCategoryNotes}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}