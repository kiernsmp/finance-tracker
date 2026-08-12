import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const handleMonthClick = (month: string) => {
        navigate(
            `/transactions?month=${month}`
        )
    }

    const handleCategoryClick = (categoryId: number) => {
        navigate(
            `/transactions?month=${month.monthYear}&categoryId=${categoryId}`
        )
    }

    return (
        <section className="dashboard-month-section">

            <div className="dashboard-month-layout">
                <div className="dashboard-main-panel">
                    <div className="dashboard-month-title">
                        <h2
                            className="dashboard-month-title"
                            onClick={() => handleMonthClick(month.monthYear)}
                        >{formatMonth(month.monthYear)}</h2>
                    </div>

                    <div className="dashboard-summary-column">
                        <CategorySummaryTable
                            categories={month.categories}
                            onCategoryClick={handleCategoryClick}
                        />

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
                    </div>
                </div>
            </div>

            <div className="dashboard-notes-panel">
                <table className="dashboard-notes-table">
                    <tbody>
                        {month.categories.map((category) => (
                            <tr
                                key={category.categoryName}
                                onClick={() => handleCategoryClick(category.categoryId)}
                            >
                                <td>{category.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}