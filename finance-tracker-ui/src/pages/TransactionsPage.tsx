import DateFilter from "@/components/DateFilter";
import TransactionSummary from "@/features/transactions/components/TransactionSummary";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import { calculateTransactionTotals } from "@/utils/calculateTransactionTotals";
import { useCategories } from "@/features/transactions/hooks/useCategories";
import { useTransactionData } from "@/features/transactions/hooks/useTransactionData";
import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters";
import { approveAllTransactions, approveTransaction, lockTransaction} from "@/api/transactionApi";

export default function TransactionsPage() {
    const {
        appliedFilter,
        setAppliedFilter,
    } = useTransactionFilters();

    const { categoryList } = useCategories();
    const { transactions, refreshTransactions, updateTransactionCategory } = useTransactionData(appliedFilter);
    const { totalIn, totalOut } = calculateTransactionTotals(transactions);
    
    const handleApproveAll = async () => {
        try {
            await approveAllTransactions();
            refreshTransactions();
            console.log("Approved all transactions");
        } catch (error) {
            console.error("Failed to approve transactions", error);
        }
    };

    const handleApproveTransaction = async (id: number, approved: boolean) => {
        try {
            await approveTransaction(id, approved);
            refreshTransactions();
                console.log("Approved transaction: " + id);
        } catch (error) {
            console.error("Failed to approve transaction", error);
        }
    }

    const handleLockTransaction = async (id: number, locked: boolean) => {
        try {
            await lockTransaction(id, locked);
            refreshTransactions()
            console.log("Locked transaction");
        } catch (error) {
            console.error("Failed to lock transaction", error);
        }
    };
    
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

            <button onClick={handleApproveAll}>
                Approve All
            </button>
        
            <TransactionTable 
                transactions={transactions} 
                categoryList={categoryList}
                updateTransactionCategory={updateTransactionCategory}
                onApproveTransaction={handleApproveTransaction}
                onLockTransaction={handleLockTransaction}
            />
            
        </div>
    );
}