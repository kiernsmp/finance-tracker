import { useCategories } from "./transactions/useCategories";
import { calculateTransactionTotals } from "./transactions/calculateTransactionTotals";
import { useTransactionData } from "./transactions/useTransactionData";
import { useTransactionFilters } from "./transactions/useTransactionFilters";

export function useTransactions() {
    const {
        startDate,
        endDate,
        categoryId,
        setStartDate,
        setEndDate,
        setCategoryId,
        applyFilters,
        appliedFilter
    } = useTransactionFilters();

    const { categoryList } = useCategories();
    const { transactions, updateCategory } = useTransactionData(appliedFilter);
    const { totalIn, totalOut } = calculateTransactionTotals(transactions);

    return {
        transactions,
        startDate,
        endDate,
        categoryId,
        setStartDate,
        setEndDate,
        setCategoryId,
        applyFilters,
        categoryList,
        updateCategory,
        totalIn,
        totalOut
    };
}