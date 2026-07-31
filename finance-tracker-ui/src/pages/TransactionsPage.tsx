import { useSearchParams } from "react-router-dom";
import TransactionFilter from "@/components/TransactionFilter";
import TransactionSummary from "@/features/transactions/components/TransactionSummary";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import { calculateTransactionTotals } from "@/utils/calculateTransactionTotals";
import { useCategories } from "@/features/transactions/hooks/useCategories";
import { useTransactionData } from "@/features/transactions/hooks/useTransactionData";
import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters";
import type { TransactionFilter as TransactionFilterType } from "@/types/TransactionFilter";

function getMonthDateRange(month: string): { startDate: string; endDate: string } | null {
    const start = new Date(`${month}-01T00:00:00`);
    if (Number.isNaN(start.getTime())) {
        return null;
    }

    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    const endDay = String(end.getDate()).padStart(2, "0");

    return {
        startDate: `${month}-01`,
        endDate: `${month}-${endDay}`,
    };
}

function getInitialFilter(month: string | null, categoryId: string | null): TransactionFilterType {
    const nextFilter: TransactionFilterType = {};

    if (month) {
        const monthRange = getMonthDateRange(month);
        if (monthRange) {
            nextFilter.startDate = monthRange.startDate;
            nextFilter.endDate = monthRange.endDate;
        }
    }

    if (categoryId) {
        const parsedCategoryId = Number(categoryId);
        if (!Number.isNaN(parsedCategoryId)) {
            nextFilter.categoryId = parsedCategoryId;
        }
    }

    return nextFilter;
}

export default function TransactionsPage() {
    const [searchParams] = useSearchParams();
    const month = searchParams.get("month");
    const categoryId = searchParams.get("categoryId");

    const {
        appliedFilter,
        setAppliedFilter,
    } = useTransactionFilters(getInitialFilter(month, categoryId));

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
                appliedFilter={appliedFilter}
                setAppliedFilter={setAppliedFilter}
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