import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "../../../api/transactionApi";
import { updateKeywordCategory } from "../../../api/keywordsApi";
import type { Transaction } from "../../../types/Transaction";
import type { TransactionFilter } from "../../../types/TransactionFilter";

export function useTransactionData(appliedFilter: TransactionFilter) {
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

    async function updateTransactionCategory(transactionId: number, categoryId: number): Promise<void> {
        const target = transactions.find((transaction) => transaction.id === transactionId);
        if (!target) return;

        try {
            await updateKeywordCategory(target.description, categoryId);
            await refreshTransactions();
        } catch (error) {
            console.error(error);
        }
    }

    return {
        transactions,
        updateTransactionCategory
    };
}
