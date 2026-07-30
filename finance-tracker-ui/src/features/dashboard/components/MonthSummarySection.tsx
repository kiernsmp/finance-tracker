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
        <section>
            <h1>{formatMonth(month.monthYear)}</h1>
            <CategorySummaryTable categories={month.categories} />
            <table>
                <tbody>
                    <tr>
                        <td><h3>Total In:</h3> {formatAuditorAmount(month.totalIn)}</td>
                        <td><h3>Total Out:</h3> {formatAuditorAmount(month.totalOut)}</td>
                        <td><h3>Net:</h3> {formatAuditorAmount(netAmount)}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}