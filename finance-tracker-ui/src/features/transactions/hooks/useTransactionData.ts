import { useCallback, useEffect, useState } from "react";
import {
    approveAllTransactions,
    approveTransaction,
    getTransactions,
    lockTransaction,
    updateCategory
} from "@/api/transactionApi";
import { updateKeywordCategory } from "@/api/keywordsApi";
import type { Transaction } from "@/types/Transaction";
import type { TransactionFilter } from "@/types/TransactionFilter";

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

    async function updateTransactionCategory(transaction: Transaction, categoryId: number): Promise<void> {
        const target = transactions.find((transactionList) => transactionList.id === transaction.id);
        if (!target) return;

        try {
            if (transaction.locked) {
                await updateCategory(target.id, categoryId);
                await refreshTransactions();
            }
            else {
                await updateKeywordCategory(target.description, categoryId);
                await refreshTransactions();

            }
        } catch (error) {
            console.error(error);
        }
    }

    async function approveAll(): Promise<void> {
        try {
            await approveAllTransactions();
            await refreshTransactions();
            console.log("Approved all transactions");
        } catch (error) {
            console.error("Failed to approve transactions", error);
        }
    }

    async function setTransactionApproved(id: number, approved: boolean): Promise<void> {
        try {
            await approveTransaction(id, approved);
            await refreshTransactions();
            console.log("Approved transaction: " + id);
        } catch (error) {
            console.error("Failed to approve transaction", error);
        }
    }

    async function setTransactionLocked(id: number, locked: boolean): Promise<void> {
        try {
            await lockTransaction(id, locked);
            await refreshTransactions();
            console.log("Locked transaction");
        } catch (error) {
            console.error("Failed to lock transaction", error);
        }
    }

    return {
        transactions,
        refreshTransactions,
        updateTransactionCategory,
        approveAll,
        setTransactionApproved,
        setTransactionLocked,
    };
}
