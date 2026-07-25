import type { CategoryOption } from "@/types/CategoryOption"
import type { Transaction } from "@/types/Transaction";

interface CategorySummaryProps {
    categorySummaryList: {
        category: CategoryOption;
        transactions: Transaction[];
    }[];
}

export function CategorySummary ({
    categorySummaryList
}: CategorySummaryProps) {

    return (
        <>
        {categorySummaryList.map((summary) => (
            <div>
                {summary.category.label}
            </div>
        ))}
        </>
    )
}