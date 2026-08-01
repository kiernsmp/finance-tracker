import { useSearchParams } from "react-router-dom";
import TransactionFilter from "@/components/TransactionFilter";
import TransactionSummary from "@/features/transactions/components/TransactionSummary";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import { calculateTransactionTotals } from "@/utils/calculateTransactionTotals";
import { useCategories } from "@/features/transactions/hooks/useCategories";
import { useTransactionData } from "@/features/transactions/hooks/useTransactionData";
import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters";
import { buildInitialFilterFromSearchParams } from "@/features/transactions/utils/transactionFilterUtils";

export default function TransactionsPage() {
    const [searchParams] = useSearchParams();

    const {
        appliedFilter,
        draftFilter,
        updateDraftFilter,
        applyFilter,
        applyWithDraftUpdates,
        clearFilters,
    } = useTransactionFilters(buildInitialFilterFromSearchParams(searchParams));

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
        <div className="transactions-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Transactions</h1>
                </div>

            </div>
            
            <TransactionFilter
                draftFilter={draftFilter}
                updateDraftFilter={updateDraftFilter}
                applyFilter={applyFilter}
                applyWithDraftUpdates={applyWithDraftUpdates}
                clearFilters={clearFilters}
                categoryList={categoryList}
            />

            <TransactionSummary 
                totalIn={totalIn}
                totalOut={totalOut}
                transactionsFound={transactions.length}
            />

            <button className="primary-action approve-all-button" onClick={approveAll}>
                Approve All
            </button>

        
            <div className="table-card">
                <TransactionTable 
                    transactions={transactions} 
                    categoryList={categoryList}
                    updateTransactionCategory={updateTransactionCategory}
                    onApproveTransaction={setTransactionApproved}
                    onLockTransaction={setTransactionLocked}
                />
            </div>
        </div>
    );
}