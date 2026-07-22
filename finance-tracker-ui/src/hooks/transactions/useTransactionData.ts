import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "../../api/transactionApi";
import { updateKeywordCategory } from "../../api/keywordsApi";
import type { CategoryOption } from "../../types/CategoryOption";
import type { Transaction } from "../../types/Transaction";
import type { TransactionFilter } from "../../types/TransactionFilter";

export function useTransactionData(
    appliedFilter: TransactionFilter,
    categoryList: CategoryOption[]
) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const refreshTransactions = useCallback(async (): Promise<void> => {
        try {
            const data = await getTransactions(appliedFilter);
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    }, [appliedFilter]);

    useEffect(() => {
        void refreshTransactions();
    }, [refreshTransactions]);

    async function updateCategory(transactionId: number, categoryId: number): Promise<void> {
        const selectedCategory = categoryList.find((category) => category.id === categoryId);
        if (!selectedCategory) return;

        const target = transactions.find((transaction) => transaction.id === transactionId);
        if (!target) return;

        try {
            await updateKeywordCategory(target.description, selectedCategory.id);
            await refreshTransactions();
        } catch (error) {
            console.error(error);
        }
    }

    return {
        transactions,
        updateCategory
    };
}
