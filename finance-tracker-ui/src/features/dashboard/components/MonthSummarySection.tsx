import type { MonthSummary } from "@/types/MonthlySummary";
import { formatAuditorAmount } from "@/utils/formatters";
import CategorySummaryTable from "./CategorySummaryTable";
import { formatMonth } from "./formatters";

interface MonthSummarySectionProps {
    month: MonthSummary;
}

export default function MonthSummarySection({
    month
}: MonthSummarySectionProps) {
    const netAmount = month.totalIn - month.totalOut;

    return (
        <section className="dashboard-month-section">
            <h2 className="dashboard-month-title">{formatMonth(month.monthYear)}</h2>
            <CategorySummaryTable categories={month.categories} />
            <div className="dashboard-metrics-row">
                <div className="dashboard-metric-card">
                    <h3>Total In</h3>
                    <strong>{formatAuditorAmount(month.totalIn)}</strong>
                </div>
                <div className="dashboard-metric-card">
                    <h3>Total Out</h3>
                    <strong>{formatAuditorAmount(month.totalOut)}</strong>
                </div>
                <div className="dashboard-metric-card">
                    <h3>Net</h3>
                    <strong>{formatAuditorAmount(netAmount)}</strong>
                </div>
            </div>
        </section>
    );
}