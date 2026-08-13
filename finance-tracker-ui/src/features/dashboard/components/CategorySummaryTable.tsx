import type { CategorySummary } from "@/types/MonthlySummary";
import { formatAuditorAmount } from "@/utils/formatters";

interface CategorySummaryTableProps {
    categories: CategorySummary[];
    onCategoryClick: (categoryId: number) => void;
}

export default function CategorySummaryTable({
    categories,
    onCategoryClick
}: CategorySummaryTableProps) {
    return (
        <div className="dashboard-tables">
            <table className="dashboard-summary-table">
                <thead>
                    <tr className="dashboard-summary-header-row">
                        <th>Category</th>
                        <th>Total Out</th>
                        <th>Total In</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr
                            className="dashboard-summary-category-row"
                            key={category.categoryName}
                            onClick={() => onCategoryClick(category.categoryId)}
                        >
                            <td>{category.categoryName}</td>
                            <td>{
                                <div className="total-out-cell">
                                    <div className="adjusted-total-out">
                                        {( category.totalOut !== 0 && category.totalOut > category.totalIn ) ? formatAuditorAmount(category.totalOut-category.totalIn) : "-"}
                                    </div>
                                    <div className="raw-total-out">
                                        {(category.totalIn !== 0 && category.totalOut !== 0) ? formatAuditorAmount(category.totalOut) : null}
                                    </div>

                                </div>
                                }
                            </td>
                            <td>{
                                <div className="total-in-cell">
                                    {category.totalIn !== 0 ? formatAuditorAmount(category.totalIn) : "-"}
                                </div>
                                }
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}