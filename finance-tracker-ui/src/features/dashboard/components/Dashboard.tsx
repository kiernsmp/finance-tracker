import { useState } from "react";
import { useTransactionData } from "@/features/transactions/hooks/useTransactionData";
import DateFilter from "@/components/DateFilter";
import { useCategories } from "@/features/transactions/hooks/useCategories";

const emptyFilter = {};

export default function Dashboard() {
    const { transactions } = useTransactionData(emptyFilter);
    const [appliedFilter, setAppliedFilter] = useState(emptyFilter);
    const { categoryList } = useCategories();

    return (
        <div>
            <h1>{transactions[0]?.description ?? "No transactions"}</h1>
            <DateFilter 
                appliedFilter={appliedFilter} 
                setAppliedFilter={setAppliedFilter}
                categoryList={categoryList}
            />
        </div>
    );
}