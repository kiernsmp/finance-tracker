import type { Transaction } from "@/types/Transaction";

export interface GroupedTransaction extends Transaction {
    transactionCount: number;
    groupedTransactions: Transaction[];
}

export function groupTransactions(
    transactions: Transaction[]
): GroupedTransaction[] {
    const groups = new Map<string, GroupedTransaction>();

    transactions.forEach(transaction => {
        const key = `${transaction.date}-${transaction.description}-${transaction.category.name}`;

        const existing = groups.get(key);

        if (existing) {
            existing.amount += transaction.amount;
            existing.transactionCount += 1;
            existing.groupedTransactions.push(transaction);
        }
        else {
            groups.set(key, {
                ...transaction,
                transactionCount:1,
                groupedTransactions: [transaction]
            })
        }
    });

    return Array.from(groups.values());
}


