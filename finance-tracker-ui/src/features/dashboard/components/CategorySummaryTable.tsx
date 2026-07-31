import { useNavigate } from "react-router-dom";
import type { CategorySummary, MonthSummary } from "@/types/MonthlySummary";
import { formatAuditorAmount } from "@/utils/formatters";

interface CategorySummaryTableProps {
    categories: CategorySummary[];
    month: MonthSummary;
}

export default function CategorySummaryTable({
    categories,
    month
}: CategorySummaryTableProps) {
    const navigate = useNavigate();

    const handleCategoryClick = (month: string, categoryId: number) => {
        console.log("Month: " + month + ", categoryId: " + categoryId);
        navigate(
            `/transactions?month=${month}&categoryId=${categoryId}`
        )
    }

    return (
        <table className="dashboard-summary-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Total Out</th>
                    <th>Total In</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr 
                        key={category.categoryName}
                        onClick={() => handleCategoryClick(month.monthYear, category.categoryId)}
                    >
                        <td>{category.categoryName}</td>
                        <td>{category.totalOut !== 0 ? formatAuditorAmount(category.totalOut) : "-"}</td>
                        <td>{category.totalIn !== 0 ? formatAuditorAmount(category.totalIn) : "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}