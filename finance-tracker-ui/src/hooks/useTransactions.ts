import { useCategories } from "./transactions/useCategories";
import { useTransactionData } from "./transactions/useTransactionData";
import { useTransactionFilters } from "./transactions/useTransactionFilters";
import { useTransactionTotals } from "./transactions/useTransactionTotals";

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
    const { transactions, updateCategory } = useTransactionData(appliedFilter, categoryList);
    const { totalIn, totalOut } = useTransactionTotals(transactions);

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