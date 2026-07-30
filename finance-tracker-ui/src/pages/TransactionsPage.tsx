import DateFilter from "@/components/DateFilter";
import TransactionSummary from "@/features/transactions/components/TransactionSummary";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import { calculateTransactionTotals } from "@/utils/calculateTransactionTotals";
import { useCategories } from "@/features/transactions/hooks/useCategories";
import { useTransactionData } from "@/features/transactions/hooks/useTransactionData";
import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters";

export default function TransactionsPage() {
    const {
        appliedFilter,
        setAppliedFilter,
    } = useTransactionFilters();

    const { categoryList } = useCategories();
    const {
        transactions,
        updateTransactionCategory,
        approveAll,
        setTransactionApproved,
        setTransactionLocked,
    } = useTransactionData(appliedFilter);
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
                transactionsFound={transactions.length}
            />

            <button onClick={approveAll}>
                Approve All
            </button>
        
            <TransactionTable 
                transactions={transactions} 
                categoryList={categoryList}
                updateTransactionCategory={updateTransactionCategory}
                onApproveTransaction={setTransactionApproved}
                onLockTransaction={setTransactionLocked}
            />
            
        </div>
    );
}