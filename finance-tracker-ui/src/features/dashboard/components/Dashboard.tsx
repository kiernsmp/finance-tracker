import { useState } from "react";
import { useTransactionData } from "@/features/transactions/hooks/useTransactionData";
import DateFilter from "@/components/DateFilter";
import { useCategories } from "@/features/transactions/hooks/useCategories";
import type { TransactionFilter } from "@/types/TransactionFilter";
import { MonthlySummaryTable } from "./monthlySummaryTable";

const emptyFilter: TransactionFilter = {};

export default function Dashboard() {
    const [appliedFilter, setAppliedFilter] = useState<TransactionFilter>(emptyFilter);
    const { transactions } = useTransactionData(appliedFilter);
    const { categoryList } = useCategories();

    return (
        <div>
            <DateFilter 
                appliedFilter={appliedFilter} 
                setAppliedFilter={setAppliedFilter}
                categoryList={categoryList}
                />
            <h1>{transactions.length}</h1>

            <MonthlySummaryTable 
                transactions={transactions}
                categoryList={categoryList}

            />

        </div>
    );
}