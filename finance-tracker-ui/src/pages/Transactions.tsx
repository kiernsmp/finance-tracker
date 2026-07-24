import DateFilter from "../components/transactions/DateFilter";
import TransactionSummary from "../components/transactions/TransactionSummary";
import TransactionTable from "../components/transactions/TransactionTable";
import { calculateTransactionTotals } from "../features/transactions/utils/calculateTransactionTotals";
import { useCategories } from "../hooks/transactions/useCategories";
import { useTransactionData } from "../hooks/transactions/useTransactionData";
import { useTransactionFilters } from "../hooks/transactions/useTransactionFilters";

export default function Transactions() {
    const {
        appliedFilter,
        setAppliedFilter,
    } = useTransactionFilters();

    const { categoryList } = useCategories();
    const { transactions, updateTransactionCategory } = useTransactionData(appliedFilter);
    const { totalIn, totalOut } = calculateTransactionTotals(transactions);
    
    return (
        <div>
        <h1>Transactions</h1>
        
        <DateFilter
            appliedFilter={appliedFilter}
            setAppliedFilter={setAppliedFilter}
            categoryList={categoryList}
        />

        <TransactionSummary 
            totalIn={totalIn}
            totalOut={totalOut}
        />
    
        <TransactionTable 
            transactions={transactions} 
            categoryList={categoryList}
            updateTransactionCategory={updateTransactionCategory}
            />
        </div>
    );
}