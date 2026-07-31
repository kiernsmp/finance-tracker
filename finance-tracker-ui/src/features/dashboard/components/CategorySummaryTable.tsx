import type { CategorySummary } from "@/types/MonthlySummary";
import { formatAuditorAmount } from "@/utils/formatters";

interface CategorySummaryTableProps {
    categories: CategorySummary[];
}

export default function CategorySummaryTable({
    categories
}: CategorySummaryTableProps) {
    return (
        <table className="dashboard-summary-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Total In</th>
                    <th>Total Out</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.categoryName}>
                        <td>{category.categoryName}</td>
                        <td>{category.totalIn !== 0 ? formatAuditorAmount(category.totalIn) : "-"}</td>
                        <td>{category.totalOut !== 0 ? formatAuditorAmount(category.totalOut) : "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}