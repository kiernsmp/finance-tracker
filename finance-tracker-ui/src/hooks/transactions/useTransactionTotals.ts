import { useMemo } from "react";
import type { Transaction } from "../../types/Transaction";

export function useTransactionTotals(transactions: Transaction[]) {
    return useMemo(() => {
        const totalOut = transactions.reduce((sum, transaction) =>
            transaction.amount < 0 ? sum + transaction.amount : sum, 0);

        const totalIn = transactions.reduce((sum, transaction) =>
            transaction.amount > 0 ? sum + transaction.amount : sum, 0);

        return {
            totalIn,
            totalOut
        };
    }, [transactions]);
}
