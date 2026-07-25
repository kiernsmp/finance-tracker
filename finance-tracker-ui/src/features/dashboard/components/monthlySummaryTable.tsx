import type { CategoryOption } from "@/types/CategoryOption";
import type { Transaction } from "@/types/Transaction";
import { CategorySummary } from "./categorySummary";


interface MonthlySummaryProps {
    transactions: Transaction[];
    categoryList: CategoryOption[];
    
}

export function MonthlySummaryTable({
    transactions,
    categoryList
}: MonthlySummaryProps) {
    
    const categorySummaryList = categoryList.map((category) => {
        const categoryTransactions = transactions.filter(
            (transaction) =>
                transaction.category === category.label
        );
        return {
            category,
            transactions: categoryTransactions
        }
    }).filter((categorySummary) => categorySummary.transactions.length > 0);

    console.log("TEMP: ", categorySummaryList);

    return (
        <div>
            <CategorySummary
                categorySummaryList = {categorySummaryList}
            />
        </div>
    );
}